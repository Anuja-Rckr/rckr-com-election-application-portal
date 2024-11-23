from django.http import JsonResponse
from rest_framework import status
from common import constants as ct
from rest_framework.decorators import api_view
from django.db.models import F, Sum, OuterRef, Subquery

from election_process.models.nominations.nominations_model import NominationsModel
from election_process.models.nominee_vote_count.nominee_vote_count_model import NomineeVoteCountModel
from common.utils import get_total_election_votes, get_total_nominations, get_vote_percentage, get_winner_details_list
from election_process.models.election.election_model import ElectionModel
from common.mappings import get_results_stat_cards, results_winner_table_col_data

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
    

def get_distribution_of_votes_number(election_id):
     result = (
        NomineeVoteCountModel.objects
        .filter(election_id=election_id)  
        .select_related('nomination')
        .annotate(emp_name=F('nomination__emp_name'))
        .values('emp_name', 'total_votes')  
    )
     return list(result)

def get_distribution_of_votes_percentage(election_id, distribution_of_votes_number, total_election_votes):     
    result = []
    for index, item in enumerate(distribution_of_votes_number):
        result_obj = {
            'emp_name' : item['emp_name'],
            'total_votes': get_vote_percentage(total_election_votes,item['total_votes']),
            'color': ct.COLORS_LIST[index],
        }
        result.append(result_obj)
    return result

def get_election_stats_cards(election_id):
    total_nominations = get_total_nominations(election_id)
    election_cut_off = list(ElectionModel.objects.filter(election_id=election_id).values('election_cutoff'))[0]
    return total_nominations, election_cut_off['election_cutoff']

@api_view(['GET'])
def get_results_chart_data(request):
    election_id = request.GET.get(ct.ELECTION_ID, None)
    election_id = int(election_id)
    if not election_id:
       return JsonResponse({
           'error': ct.ELECTION_ID_REQUIRED
       }, status=status.HTTP_400_BAD_REQUEST)
    try:
        total_election_votes = get_total_election_votes(election_id)
        distribution_of_votes_number = get_distribution_of_votes_number(election_id)
        distribution_of_votes_percentage = get_distribution_of_votes_percentage(election_id, distribution_of_votes_number, total_election_votes)
        total_nominations, election_cut_off = get_election_stats_cards(election_id)
        response_obj = {
            'distribution_of_votes_number': distribution_of_votes_number,
            'distribution_of_votes_percentage': distribution_of_votes_percentage,
            'stat_cards': get_results_stat_cards(total_election_votes, total_nominations, election_cut_off)
        }
        return JsonResponse({
            'data': response_obj
        }, status=status.HTTP_200_OK)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
    
def get_results_table_row_data(election_id):
    results = list(
        NomineeVoteCountModel.objects
        .filter(election_id=election_id)  
        .select_related('nomination')
        .annotate(emp_name=F('nomination__emp_name'), emp_role=F('nomination__emp_role'), created_at=F('nomination__created_at'))
        .values('emp_name', 'emp_role', 'total_votes', 'created_at')  
    )
    total_election_votes = get_total_election_votes(election_id)
    for index, item in enumerate(results):
        item['total_votes_%'] = get_vote_percentage(total_election_votes, item['total_votes'])
    return results

@api_view(['GET'])
def get_results_table(request):
    election_id = int(request.GET.get(ct.ELECTION_ID, None))
    if not election_id:
       return JsonResponse({
           'error': ct.ELECTION_ID_REQUIRED
       }, status=status.HTTP_400_BAD_REQUEST)
    try:
        col_data = results_winner_table_col_data()
        row_data = get_results_table_row_data(election_id)
        response_obj = {
            'col_data': col_data,
            'row_data': row_data
        }
        return JsonResponse({
            'data': response_obj
        }, status=status.HTTP_200_OK)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)