from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework import status
from common import constants as ct
from election_process.models.election.election_model import ElectionModel

@api_view(['GET'])
def get_dashboard_election_list(request):
    try:
        election_list = list(
            ElectionModel.objects.exclude(
                election_status__in=[ct.CLOSED, ct.LIVE]
            ).values(
                *ct.DASHBOARD_ELECTION_LIST
            )
        )
        return JsonResponse({'data': election_list}, status=status.HTTP_200_OK)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
