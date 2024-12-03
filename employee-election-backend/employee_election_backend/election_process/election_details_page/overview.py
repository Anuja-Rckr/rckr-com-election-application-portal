from django.http import JsonResponse
from rest_framework import status
from django.core.serializers import serialize
import json
from common import constants as ct
from election_process.models.election.election_model import ElectionModel
from common.mappings import get_results_overview_list
from common.utils import get_total_election_votes, get_total_nominations
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_election_overview_details(request):
   election_id = request.GET.get(ct.ELECTION_ID, None)
   
   if not election_id:
       return JsonResponse({
           'error': ct.ELECTION_ID_REQUIRED
       }, status=status.HTTP_400_BAD_REQUEST)
   
   try:
       election_overview_details = list(ElectionModel.objects.filter(election_id=election_id).values(*ct.OVERVIEW_DETAILS_FIELDS))[0]
       election_overview_details_list = get_results_overview_list(election_overview_details)
       return JsonResponse({
           'data': election_overview_details_list
       }, status=status.HTTP_200_OK)
   
   except Exception as err:
       return JsonResponse({
           'error': str(err)
       }, status=status.HTTP_400_BAD_REQUEST)
   
@api_view(['GET'])
def get_election_timeline_details(request):
    election_id = request.GET.get(ct.ELECTION_ID, None)

    if not election_id:
        return JsonResponse({
           'error': ct.ELECTION_ID_REQUIRED
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        election_details = list(ElectionModel.objects.filter(election_id=election_id).values())[0]
        election_count_data = {
            'total_votes': get_total_election_votes(election_id),
            'total_nominations': get_total_nominations(election_id)
        }
        return JsonResponse({
           'data': {
               'election_details': election_details,
               'election_count_data': election_count_data
           }
        }, status=status.HTTP_200_OK)
   
    except Exception as err:
        return JsonResponse({
           'error': str(err)
        }, status=status.HTTP_400_BAD_REQUEST)