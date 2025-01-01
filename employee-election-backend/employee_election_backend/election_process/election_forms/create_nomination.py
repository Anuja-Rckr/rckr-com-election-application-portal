import threading
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from common import constants as ct
from election_process.models.nominations.nominations_serializer import NominationsSerializer
from election_process.models.nominations.nominations_model import NominationsModel
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from communication.email.email_sender import trigger_single_email
from election_process.models.election.election_model import ElectionModel


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_emp_nomination(request, election_id):
    if not request.user.groups.filter(name=ct.USER).exists():
        return JsonResponse({
            'error': ct.ACCESS_DENIED
        }, status=status.HTTP_403_FORBIDDEN) 

    nomination_details = request.data
    nomination_details['election'] = election_id

    if not nomination_details:
       return JsonResponse({
           'error': ct.NOMINATION_DETAILS_EMPTY
       }, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_id = nomination_details.get('user_id')
        if not User.objects.filter(id=user_id).exists():
            return JsonResponse({'error': 'Invalid user ID'}, status=status.HTTP_400_BAD_REQUEST)

        is_nomination_exists = NominationsModel.objects.filter(
            election_id=election_id, user_id=user_id
        ).exists()
        if is_nomination_exists:
            return JsonResponse({
                'error': f'{ct.NOMINATION_ALREADY_EXISTS} with Emp ID {user_id}'
            }, status=status.HTTP_400_BAD_REQUEST)

        nomination_details['user'] = user_id
        serializer = NominationsSerializer(data=nomination_details)

        if serializer.is_valid():
            created_nomination = serializer.save()
            election_details = ElectionModel.objects.filter(election_id=election_id).values("election_title").first()
            email_details = {
                "election_title": election_details['election_title'],
                "user_id": nomination_details['user_id'],
                "created_at": NominationsSerializer(created_nomination).data.get('created_at')
            }
            email_thread = threading.Thread(
                target=trigger_single_email,
                args=('create_nomination', email_details)
                )
            email_thread.start()
            return JsonResponse({
                'data': NominationsSerializer(created_nomination).data
            }, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
