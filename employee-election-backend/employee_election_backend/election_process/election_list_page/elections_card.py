from django.db.models import Q
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from datetime import datetime
from common import constants as ct
from election_process.models.election.election_model import ElectionModel
from common.utils import get_count_data

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_elections_card(request):
    try:
        now = datetime.now()
        count_db_data = {
            ct.DECLARED: ElectionModel.objects.filter(nomination_start_date__gt=now).count(),
            ct.NOMINATIONS: ElectionModel.objects.filter(
                nomination_start_date__lte=now, nomination_end_date__gte=now
            ).count(),
            ct.LIVE: ElectionModel.objects.filter(
                voting_start_date__lte=now, voting_end_date__gte=now
            ).count(),
            ct.COMPLETED: ElectionModel.objects.filter(
                voting_end_date__lt=now, results_published_date__isnull=True
            ).count(),
            ct.CLOSED: ElectionModel.objects.filter(
                results_published_date__isnull=False
            ).count(),
        }
        count_data = get_count_data(count_db_data)
        return JsonResponse({'data':count_data }, status=status.HTTP_200_OK)
    except Exception as error:
       return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
