from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from common import constants as ct
from common import mappings as mp
from election_process.models.election.election_model import ElectionModel
from common.utils import apply_search_sort_pagination

@api_view(['GET'])
def get_elections_list(request):
    page = request.GET.get(ct.PAGE, '1')
    limit = request.GET.get(ct.LIMIT, '10')
    search_input = request.GET.get(ct.SEARCH_INPUT, '')
    sort_field = request.GET.get('sort_field', 'created_at')
    sort_direction = request.GET.get('sort_direction', 'desc')
    try:
        elections_row_data = list(ElectionModel.objects.values(*ct.ELECTION_LIST_FIELDS))
        total_count = len(elections_row_data)
        elections_row_data = apply_search_sort_pagination(elections_row_data, search_input, sort_field, sort_direction, page, limit)
        response_obj = {
            'row_data': elections_row_data,
            'col_data': mp.ELECTION_TABLE_COLUMN_DATA,
            'total_rows': total_count
        }
        return JsonResponse({'data': response_obj}, status=status.HTTP_200_OK)
    except Exception as error:
       return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
