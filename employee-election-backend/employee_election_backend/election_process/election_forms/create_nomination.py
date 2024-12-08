from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from common import constants as ct
from election_process.models.nominations.nominations_serializer import NominationsSerializer
from election_process.models.nominations.nominations_model import NominationsModel

@api_view(['POST'])
def create_emp_nomination(request, election_id):
    nomination_details = request.data
    nomination_details['election'] = election_id
    if not nomination_details:
       return JsonResponse({
           'error': ct.NOMINATION_DETAILS_EMPTY
       }, status=status.HTTP_400_BAD_REQUEST)
    try:
        is_nomination_exists = NominationsModel.objects.filter(election_id=election_id,emp_id=nomination_details['emp_id'])
        if is_nomination_exists:
            return JsonResponse({'error': f'{ct.NOMINATION_ALREADY_EXISTS} with Emp ID {nomination_details['emp_id']}'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = NominationsSerializer(data=nomination_details)
        if serializer.is_valid():
            created_nomination = serializer.save()
            return JsonResponse({
                'data': NominationsSerializer(created_nomination).data
            }, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)