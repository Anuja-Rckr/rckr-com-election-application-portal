from common import constants as ct
from common.mappings import getIconForCard
from django.db.models import Sum
from election_process.models.nominee_vote_count.nominee_vote_count_model import NomineeVoteCountModel
from election_process.models.nominations.nominations_model import NominationsModel
from collections import defaultdict
import bisect

def get_count_data(count_db_data):
    result = []
    for key, value in count_db_data.items():
        temp_dict = {
            'title': key, 
            'value': value,
            'icon': getIconForCard(key)
        }
        result.append(temp_dict)
    return result

def get_vote_percentage(total_votes, candidate_votes):
    total_votes = int(total_votes)
    if total_votes == 0:
        return 0 
    result = (candidate_votes / total_votes) * 100
    return round(result,2)

def get_total_election_votes(election_id):
    result = NomineeVoteCountModel.objects.filter(election_id=election_id).aggregate(total_votes=Sum('total_votes'))
    total_votes = result['total_votes'] if result['total_votes'] is not None else 0
    return total_votes

def get_total_nominations(election_id):
    result = NominationsModel.objects.filter(election_id=election_id).count()
    return result

# Return Paginated data based on limit and page
def get_paginated_data(data, page = 1, limit = 10):
    start = (page - 1) * limit
    end = start + limit
    return data[start:end]

# Perform Search on list of dictionaries using inverted index
def build_inverted_index(list_data):
    inverted_index = defaultdict(set)
    
    for i, item in enumerate(list_data):
        for key, value in item.items():
            if isinstance(value, str):
                words = value.lower().split()
                for word in words:
                    for j in range(1, len(word) + 1):  # Store all prefixes of the word
                        inverted_index[word[:j]].add(i)
    
    return inverted_index

def get_search_results(search_input, list_data):
    inverted_index = build_inverted_index(list_data)
    search_words = search_input.lower().split()
    
    if not search_words:
        return []

    result_indices = set()
    for word in search_words:
        if word in inverted_index:
            if not result_indices:
                result_indices = inverted_index[word]
            else:
                result_indices &= inverted_index[word]
        else:
            return []
    search_results = [list_data[i] for i in result_indices]
    return search_results

# Perform custom sort based on quick sort
def partition(data, low, high, key):
    pivot = data[(low + high) // 2].get(key, '')
    i, j = low - 1, high + 1
    while True:
        i += 1
        while data[i].get(key, '') < pivot:
            i += 1
        j -= 1
        while data[j].get(key, '') > pivot:
            j -= 1
        if i >= j:
            return j
        data[i], data[j] = data[j], data[i]

def quicksort(data, low, high, key):
    if low < high:
        split = partition(data, low, high, key)
        quicksort(data, low, split, key)
        quicksort(data, split + 1, high, key)

def custom_sort(data, key, reverse=False):
    quicksort(data, 0, len(data) - 1, key)
    return data if not reverse else data[::-1]

# Perform Filter using binary search
def create_index(data, keys):
    index = {key: defaultdict(list) for key in keys}
    for i, item in enumerate(data):
        for key in keys:
            value = str(item.get(key, '')).lower()
            index[key][value].append(i)
    return index

def binary_search(arr, x):
    i = bisect.bisect_left(arr, x)
    if i != len(arr) and arr[i] == x:
        return i
    return -1


def apply_search_sort_pagination(list_data, search_input='', sort_field = 'created_at', sort_direction = 'desc', page = '1', limit='10'):
    page = int(page)
    limit = int(limit)
    reverse = sort_direction.lower() == 'desc'
    if search_input:
        list_data = get_search_results(search_input, list_data)
    list_data = custom_sort(list_data, key=sort_field, reverse=reverse)
    list_data = get_paginated_data(list_data, page, limit)
    return list_data

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
            'value': winner_details['user_id'],
            'type': 'data'
        },
        {
            'title': 'Name',
            'value': winner_details['user_name'],
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

