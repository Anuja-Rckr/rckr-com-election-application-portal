from django.http import JsonResponse
from common import constants as ct
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from election_process.models.election.election_model import ElectionModel
from election_process.models.nominations.nominations_model import NominationsModel
from common.utils import get_nominations_details_list
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db.models import F


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_nominations_details(request, election_id):
    if not election_id:
       return JsonResponse({
           'error': ct.ELECTION_ID_REQUIRED
       }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        nomination_details = list(ElectionModel.objects.filter(election_id=int(election_id)).values(*ct.NOMINATION_DETAILS_FIELDS))[0]
        total_nominations = NominationsModel.objects.filter(election_id=int(election_id)).count()
        nomination_details_list = get_nominations_details_list(nomination_details,total_nominations)
        return JsonResponse({'data': nomination_details_list}, status=status.HTTP_200_OK)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_nomination_candidates_list(request, election_id):
    if not election_id:
        return JsonResponse({
            'error': ct.ELECTION_ID_REQUIRED,
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        nominations_list = list(
            NominationsModel.objects
            .filter(election_id=int(election_id))
            .select_related('user')
            .annotate(
            user_name=F('user__username')  
            ).
            values())
        return JsonResponse({'data': nominations_list}, status=status.HTTP_200_OK)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)