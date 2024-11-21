from django.http import JsonResponse
from rest_framework import status
from common import constants as ct
from rest_framework.decorators import api_view
from django.db.models import F, Sum, OuterRef, Subquery

from election_process.models.nominations.nominations_model import NominationsModel
from election_process.models.nominee_vote_count.nominee_vote_count_model import NomineeVoteCountModel
from common.utils import get_total_election_votes, get_winner_details_list

@api_view(['GET'])
def get_winner_details(request):
    election_id = request.GET.get(ct.ELECTION_ID, None)
    election_id = int(election_id)
    if not election_id:
       return JsonResponse({
           'error': ct.ELECTION_ID_REQUIRED
       }, status=status.HTTP_400_BAD_REQUEST)
    try:
        winner = NominationsModel.objects.filter(
            election_id=election_id
        ).values('emp_id', 'emp_name', 'emp_role').annotate(
            total_votes=Sum('nomineevotecountmodel__total_votes')
        ).order_by('-total_votes').first()
       
        total_election_votes = get_total_election_votes(election_id)
        if not winner:
            return JsonResponse({
                'error': ct.NO_WINNER_FOR_ELECTION
            }, status=status.HTTP_404_NOT_FOUND)
        
        return JsonResponse({
            'data': get_winner_details_list(winner, total_election_votes)
        }, status=status.HTTP_200_OK)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)