from django.http import JsonResponse
from rest_framework import status
from django.core.serializers import serialize
import json
from common import constants as ct
from election_process.models.election.election_model import ElectionModel

def get_election_overview_details(request):
   election_id = request.GET.get(ct.ELECTION_ID, None)
   
   if not election_id:
       return JsonResponse({
           'error': ct.ELECTION_ID_REQUIRED
       }, status=status.HTTP_400_BAD_REQUEST)
   
   try:
       election_overview_details = list(ElectionModel.objects.filter(election_id=election_id).values(*ct.OVERVIEW_DETAILS_FIELDS))[0]
       
       return JsonResponse({
           'data': election_overview_details
       }, status=status.HTTP_200_OK)
   
   except Exception as err:
       return JsonResponse({
           'error': str(err)
       }, status=status.HTTP_400_BAD_REQUEST)