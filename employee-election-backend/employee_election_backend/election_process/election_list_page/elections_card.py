from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from common import constants as ct
from django.db.models import Count, Q
from election_process.models.election.election_model import ElectionModel
from common.utils import get_count_data

@api_view(['GET'])
def get_elections_card(request):
    try:
        election_list =ElectionModel.objects.values()
        count_db_data = election_list.aggregate(
            Declared=Count(ct.ELECTION_ID, filter=Q(election_status=ct.DECLARED)),
            Nominations=Count(ct.ELECTION_ID, filter=Q(election_status=ct.NOMINATIONS)),
            Live=Count(ct.ELECTION_ID, filter=Q(election_status=ct.LIVE)),
            Completed=Count(ct.ELECTION_ID, filter=Q(election_status=ct.COMPLETED)),
            Closed=Count(ct.ELECTION_ID, filter=Q(election_status=ct.CLOSED)),
        )
        count_data = get_count_data(count_db_data)
        return JsonResponse({'data':count_data }, status=status.HTTP_200_OK)
    except Exception as error:
       return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
