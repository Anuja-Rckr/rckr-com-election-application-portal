from common import constants as ct
from common.mappings import getIconForCard
from django.db.models import Sum
from election_process.models.nominee_vote_count.nominee_vote_count_model import NomineeVoteCountModel

def get_count_data(count_db_data):
    result = []
    for index, (status, count) in enumerate(count_db_data.items()):
        temp_dict = {
            'title': status.replace("_", " ").title(), 
            'value': count,
            'icon': getIconForCard(status)
        }
        result.append(temp_dict)
    return result

def get_vote_percentage(total_votes, candidate_votes):
    if total_votes == 0:
        return 0 
    result = (candidate_votes / total_votes) * 100
    return round(result,2)


def get_nominations_details_list(nomination_details,total_nominations):
    result = [
        {
            'title': 'Start Date',
            'value': nomination_details['nomination_start_date'],
            'type': 'datetime'
        },
        {
            'title': 'End Date',
            'value': nomination_details['nomination_end_date'],
            'type': 'datetime'
        },
        {
            'title': 'Total Nominations',
            'value': total_nominations,
            'type': 'data'
        }
    ]
    return result

def get_winner_details_list(winner_details, total_votes):
    result = [
        {
            'title': 'Emp ID',
            'value': winner_details['emp_id'],
            'type': 'data'
        },
        {
            'title': 'Name',
            'value': winner_details['emp_name'],
            'type': 'data'
        },
        {
            'title': 'Role',
            'value': winner_details['emp_role'],
            'type': 'data'
        },
        {
            'title': 'Total Votes',
            'value': winner_details['total_votes'],
            'type': 'data'
        },
        {
            'title': 'Total Votes',
            'value': f'{get_vote_percentage(total_votes, winner_details['total_votes'])}%',
            'type': 'data'
        },
    ]
    return result

def get_total_election_votes(election_id):
    result = NomineeVoteCountModel.objects.filter(election_id=election_id).aggregate(total_votes=Sum('total_votes'))
    total_votes = result['total_votes'] if result['total_votes'] is not None else 0
    return total_votes