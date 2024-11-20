from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from common import constants as ct
from election_process.models.election.election_model import ElectionModel

@api_view(['GET'])
def get_elections_list(request):
    try:
        elections_row_data = list(ElectionModel.objects.values(*ct.ELECTION_LIST_FIELDS))
        response_obj = {
            'row_data': elections_row_data,
            'col_data': ct.ELECTION_TABLE_COLUMN_DATA
        }
        return JsonResponse({'data': response_obj}, status=status.HTTP_200_OK)
    except Exception as error:
       return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
