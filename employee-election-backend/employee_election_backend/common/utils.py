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