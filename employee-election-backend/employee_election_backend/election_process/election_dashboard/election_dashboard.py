from datetime import datetime
import threading
from rest_framework.decorators import api_view,permission_classes
from django.http import JsonResponse
from rest_framework import status
from common import constants as ct
from election_process.models.election.election_model import ElectionModel
from election_process.models.nominations.nominations_model import NominationsModel
from common.mappings import get_voting_list_column_data
from election_process.models.emp_voting.emp_voting_serializer import EmpVotingSerializer
from django.db import transaction
from election_process.models.nominee_vote_count.nominee_vote_count_model import NomineeVoteCountModel
from django.db.models import F
from rest_framework.permissions import IsAuthenticated
from election_process.models.emp_voting.emp_voting_model import EmpVotingModel
from django.contrib.auth.models import User

from communication.email.email_sender import trigger_single_email

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_dashboard_election_list(request):
    try:
        now = datetime.now()

        election_list = list(
        ElectionModel.objects.exclude(
            results_published_date__isnull=False
        ).values(
            *ct.DASHBOARD_ELECTION_LIST
        ).order_by('-created_at')
        )

        return JsonResponse({'data': election_list}, status=status.HTTP_200_OK)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_voting_list(request, election_id):
    if not election_id:
       return JsonResponse({
           'error': ct.ELECTION_ID_REQUIRED
       }, status=status.HTTP_400_BAD_REQUEST)
    try:    
        voting_list_column_data = get_voting_list_column_data()
        voting_list_row_data = list(NominationsModel.objects.filter(election_id=election_id).values().order_by('-rckr_emp_id'))
        return JsonResponse({'data': {'column_data': voting_list_column_data, 'row_data': voting_list_row_data}}, status=status.HTTP_200_OK)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_vote(request, election_id):
    vote_details = request.data
    vote_details['election'] = election_id

    if not election_id:
        return JsonResponse({
            'error': ct.ELECTION_ID_REQUIRED
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        with transaction.atomic():
            user_id = vote_details.get('user_id')
            if not User.objects.filter(id=user_id).exists():
                return JsonResponse({
                    'error': 'Invalid user ID'
                }, status=status.HTTP_400_BAD_REQUEST)

            is_emp_voted = EmpVotingModel.objects.filter(
                election_id=election_id,
                user_id=user_id
            ).exists()
            if is_emp_voted:
                return JsonResponse({
                    'error': 'Employee has already cast their vote'
                }, status=status.HTTP_400_BAD_REQUEST)

            vote_details['user'] = user_id 
            emp_vote_status_serializer = EmpVotingSerializer(data=vote_details)
            if not emp_vote_status_serializer.is_valid():
                return JsonResponse(
                    emp_vote_status_serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

            nomination = NominationsModel.objects.get(
                user_id=vote_details['nominee_user_id'],
                election_id=election_id
            )
            nomination_id = nomination.nomination_id

            nominee_vote_count_obj, created = NomineeVoteCountModel.objects.get_or_create(
                election_id=election_id,
                user_id=vote_details.get('nominee_user_id'),
                nomination_id=nomination_id,
                defaults={'total_votes': 1}
            )

            if not created:
                nominee_vote_count_obj.total_votes = F('total_votes') + 1
                nominee_vote_count_obj.save()

            emp_vote_data = emp_vote_status_serializer.save()
            election_details = ElectionModel.objects.filter(election_id=election_id).values("election_title").first()
            email_details = {
                "election_title": election_details['election_title'],
                "user_id": vote_details['user_id'],
                "created_at": EmpVotingSerializer(emp_vote_data).data.get('voted_at')
            }
            email_thread = threading.Thread(
                target=trigger_single_email,
                args=('record_vote', email_details)
                )
            email_thread.start()
            return JsonResponse({
                'data': 'Vote recorded successfully',
            }, status=status.HTTP_200_OK)

    except Exception as error:
        return JsonResponse({
            'error': str(error)
        }, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_election_vote_status(request, user_id, election_id):
    try:
        election_vote_status = EmpVotingModel.objects.filter(election_id=election_id, user_id=user_id).exists()
        is_emp_voted = False
        if election_vote_status:
            is_emp_voted = True
        return JsonResponse({ 
                'data': {'is_emp_voted': is_emp_voted}, 
            }, status=status.HTTP_200_OK) 
    except Exception as error: 
        return JsonResponse({ 
            'error': str(error) 
        }, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_election_nomination_status(request, user_id, election_id):
    if not request.user.groups.filter(name=ct.USER).exists():
        return JsonResponse({
            'error': ct.ACCESS_DENIED
        }, status=status.HTTP_403_FORBIDDEN) 
    try:
        election_nomination_status = list(NominationsModel.objects.filter(election_id=election_id, user_id=user_id).values())
        is_emp_nominated = False
        if election_nomination_status:
            is_emp_nominated = True
        return JsonResponse({ 
                'data': {'is_emp_nominated': is_emp_nominated}, 
            }, status=status.HTTP_200_OK) 
    except Exception as error: 
        return JsonResponse({ 
            'error': str(error) 
        }, status=status.HTTP_400_BAD_REQUEST)