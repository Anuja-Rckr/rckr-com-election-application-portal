from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from common import constants as ct
from election_process.models.election.election_serializer import ElectionSerializer
from election_process.models.election.election_model import ElectionModel
from rest_framework.permissions import IsAuthenticated
from communication.email.email_sender import trigger_email
import threading

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_election(request):
    if not request.user.groups.filter(name=ct.ADMIN).exists():
        return JsonResponse({
            'error': ct.ACCESS_DENIED
        }, status=status.HTTP_403_FORBIDDEN)
    election_details = request.data
    if not election_details:
       return JsonResponse({
           'error': ct.ELECTION_DETAILS_EMPTY
       }, status=status.HTTP_400_BAD_REQUEST)
    try:
        serializer = ElectionSerializer(data=election_details)
        if serializer.is_valid():
            created_election = serializer.save()
            email_thread = threading.Thread(
                target=trigger_email,
                args=('creation', election_details)
            )
            email_thread.start()
            return JsonResponse({
                'data': ElectionSerializer(created_election).data
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_election(request, election_id):
    if not request.user.groups.filter(name=ct.ADMIN).exists():
        return JsonResponse({
            'error': ct.ACCESS_DENIED
        }, status=status.HTTP_403_FORBIDDEN) 
    election_details = request.data
    if not election_id:
        return JsonResponse({
           'error': ct.ELECTION_DETAILS_EMPTY
       }, status=status.HTTP_400_BAD_REQUEST)

    try:
        election = ElectionModel.objects.filter(election_id=election_id).first()
        if not election:
            return JsonResponse({
                'error': ct.ELECTION_NOT_FOUND
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = ElectionSerializer(election, data=election_details, partial=True)
        if serializer.is_valid():
            updated_election_details = serializer.save()
            type = "results"
            if election_details.get('results_published_date'):
                type = "results"
            elif election_details.get('voting_start_date') and election_details.get('voting_end_date'):
                type = "voting"
            elif election_details.get('nomination_start_date') and election_details.get('nomination_end_date'):
                type = "nomination"
            election_data = ElectionSerializer(updated_election_details).data
            email_thread = threading.Thread(
            target=trigger_email,
            args=(type, election_data)
            )
            email_thread.start()

            return JsonResponse({
                'data': ElectionSerializer(updated_election_details).data
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)