from datetime import datetime
from rest_framework.decorators import api_view
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

from election_process.models.emp_voting.emp_voting_model import EmpVotingModel

@api_view(['GET'])
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
def get_voting_list(request, election_id):
    if not election_id:
       return JsonResponse({
           'error': ct.ELECTION_ID_REQUIRED
       }, status=status.HTTP_400_BAD_REQUEST)
    try:
        voting_list_column_data = get_voting_list_column_data()
        voting_list_row_data = list(NominationsModel.objects.filter(election_id=election_id).values())
        return JsonResponse({'data': {'column_data': voting_list_column_data, 'row_data': voting_list_row_data}}, status=status.HTTP_200_OK)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST']) 
def create_vote(request, election_id): 
    vote_details = request.data 
    vote_details['election'] = election_id
    if not election_id: 
        return JsonResponse({ 
            'error': ct.ELECTION_ID_REQUIRED 
        }, status=status.HTTP_400_BAD_REQUEST) 
     
    try: 
        with transaction.atomic(): 
            # Validate serializer
            is_emp_voted = list(EmpVotingModel.objects.filter(election_id=election_id,emp_id=vote_details['emp_id']).values())
            if is_emp_voted:
                return JsonResponse({ 
                'error': 'Employee has already cast their vote' 
                }, status=status.HTTP_400_BAD_REQUEST)
            
            emp_vote_status_serializer = EmpVotingSerializer(data=vote_details) 
            if not emp_vote_status_serializer.is_valid(): 
                return JsonResponse( 
                    emp_vote_status_serializer.errors,  
                    status=status.HTTP_400_BAD_REQUEST 
                )             
            nomination = NominationsModel.objects.get(
            emp_id=vote_details['nominee_emp_id'], 
            election_id=election_id
            )
            nomination_id = nomination.nomination_id
            # Attempt to get existing record or create new
            nominee_vote_count_obj, created = NomineeVoteCountModel.objects.get_or_create(
                election_id=election_id, 
                emp_id=vote_details.get('nominee_emp_id'),
                nomination_id=nomination_id,
                defaults={'total_votes': 1}
            )
            
            # If record exists, increment votes
            if not created:
                nominee_vote_count_obj.total_votes = F('total_votes') + 1
                nominee_vote_count_obj.save()
            
            # Save employee vote status
            emp_vote_status = emp_vote_status_serializer.save() 
             
            return JsonResponse({ 
                'data': 'Vote recorded successfully', 
            }, status=status.HTTP_200_OK) 
     
    except Exception as error: 
        return JsonResponse({ 
            'error': str(error) 
        }, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_election_vote_status(request, emp_id, election_id):
    try:
        election_vote_status = list(EmpVotingModel.objects.filter(election_id=election_id, emp_id=emp_id).values())
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
def get_election_nomination_status(request, emp_id, election_id):
    try:
        election_nomination_status = list(NominationsModel.objects.filter(election_id=election_id, emp_id=emp_id).values())
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