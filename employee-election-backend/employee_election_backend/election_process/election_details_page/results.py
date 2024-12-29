from django.http import JsonResponse
from rest_framework import status
from common import constants as ct
from rest_framework.decorators import api_view, permission_classes
from django.db.models import F, Sum, OuterRef, Subquery
from election_process.models.nominations.nominations_model import NominationsModel
from election_process.models.nominee_vote_count.nominee_vote_count_model import NomineeVoteCountModel
from common.utils import get_total_election_votes, get_total_nominations, get_vote_percentage, get_winner_details_list
from election_process.models.election.election_model import ElectionModel
from common.mappings import get_results_stat_cards, results_winner_table_col_data
from election_process.models.emp_voting.emp_voting_model import EmpVotingModel
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_winner_details(request, election_id, user_id):
    if not election_id:
       return JsonResponse({
           'error': ct.ELECTION_ID_REQUIRED
       }, status=status.HTTP_400_BAD_REQUEST)
    try:
        winner_votes = NomineeVoteCountModel.objects.filter(election_id=election_id).values('total_votes', 'nomination_id').order_by('-total_votes').first()
        winner_details = NominationsModel.objects.filter(nomination_id=winner_votes['nomination_id']).values(*ct.WINNER_DETAILS_LIST).first()
        if winner_details:
            winner_details = {**winner_details, 'total_votes': winner_votes['total_votes']}
        total_election_votes = get_total_election_votes(election_id)
        if not winner_details or not winner_votes:
            return JsonResponse({
                'error': ct.NO_WINNER_FOR_ELECTION
            }, status=status.HTTP_404_NOT_FOUND)
        return JsonResponse({
            'data': get_winner_details_list(winner_details, total_election_votes)
        }, status=status.HTTP_200_OK)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
    

def get_distribution_of_votes_number(election_id):
     result = (
        NomineeVoteCountModel.objects
        .filter(election_id=election_id)  
        .select_related('nomination')
        .annotate(user_name=F('nomination__user_name'))
        .values('user_name', 'total_votes')  
    )
     return list(result)

def get_distribution_of_votes_percentage(election_id, distribution_of_votes_number, total_election_votes):     
    result = []
    for index, item in enumerate(distribution_of_votes_number):
        result_obj = {
            'name' : item['user_name'],
            'value': get_vote_percentage(total_election_votes,item['total_votes']),
            'color': ct.COLORS_LIST[index],
        }
        result.append(result_obj)
    return result

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_results_chart_data(request, election_id):
    if not election_id:
       return JsonResponse({
           'error': ct.ELECTION_ID_REQUIRED
       }, status=status.HTTP_400_BAD_REQUEST)
    try:
        total_election_votes = get_total_election_votes(election_id)
        distribution_of_votes_number = get_distribution_of_votes_number(election_id)
        distribution_of_votes_percentage = get_distribution_of_votes_percentage(election_id, distribution_of_votes_number, total_election_votes)
        total_nominations = get_total_nominations(election_id)
        response_obj = {
            'distribution_of_votes_number': distribution_of_votes_number,
            'distribution_of_votes_percentage': distribution_of_votes_percentage,
            'stat_cards': get_results_stat_cards(total_election_votes, total_nominations)
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
        .annotate(user_name=F('nomination__user_name'))
        .values('user_name','total_votes', )  
    )
    total_election_votes = get_total_election_votes(election_id)
    for index, item in enumerate(results):
        item['total_votes_%'] = f'{get_vote_percentage(total_election_votes, item['total_votes'])} %'
    return results

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_results_table(request,election_id):
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
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_emp_voted_list(request,election_id):
    if not election_id:
       return JsonResponse({
           'error': ct.ELECTION_ID_REQUIRED
       }, status=status.HTTP_400_BAD_REQUEST)
    try:
        row_data = list(EmpVotingModel.objects.filter(election_id=election_id).values('user_id', 'user_name'))
        election_details = list(ElectionModel.objects.filter(election_id=election_id).values(*ct.ELECTION_REPORT_LISt))[0]
        return JsonResponse({
            'data': {'emp_vote_list': row_data, 'election_details': election_details}
        }, status=status.HTTP_200_OK)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)