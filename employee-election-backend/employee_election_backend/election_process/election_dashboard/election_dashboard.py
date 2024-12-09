from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework import status
from common import constants as ct
from election_process.models.election.election_model import ElectionModel
from election_process.models.nominations.nominations_model import NominationsModel
from common.mappings import get_voting_list_column_data

@api_view(['GET'])
def get_dashboard_election_list(request):
    try:
        election_list = list(
            ElectionModel.objects.exclude(
                election_status__in=[ct.CLOSED]
            ).values(
                *ct.DASHBOARD_ELECTION_LIST
            )
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