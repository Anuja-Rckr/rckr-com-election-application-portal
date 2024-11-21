from common import constants as ct
from common.mappings import getIconForCard

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
