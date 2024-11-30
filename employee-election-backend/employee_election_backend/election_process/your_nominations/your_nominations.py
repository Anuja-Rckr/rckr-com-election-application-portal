from django.http import JsonResponse
from rest_framework.decorators import api_view
from common import constants as ct
from rest_framework import status
from django.db.models import F
from election_process.models.nominations.nominations_model import NominationsModel
from election_process.models.election.election_model import ElectionModel
from common.mappings import get_nomination_list_col_data, get_your_nominations_cards_list
from common.utils import apply_search_sort_pagination

@api_view(['GET'])
def get_your_nominations_cards(request):
    emp_id = int(request.GET.get(ct.EMP_ID, None))
    
    if not emp_id:
       return JsonResponse({
           'error': ct.EMP_ID_REQUIRED
       }, status=status.HTTP_400_BAD_REQUEST)
    try:
        total_nominations = NominationsModel.objects.filter(emp_id=emp_id).count()
        active_nominations = (
            ElectionModel.objects
            .filter(nominationsmodel__emp_id=emp_id, election_status=ct.NOMINATIONS)
            .select_related('nominationsmodel')
            .count()
        )
        scheduled_nominations = (
            ElectionModel.objects
            .filter(nominationsmodel__emp_id=emp_id, election_status__in=[ct.LIVE, ct.COMPLETED, ct.CLOSED])
            .select_related('nominationsmodel')
            .count()
        )
        completed_nominations = total_nominations - (active_nominations + scheduled_nominations)
        data = get_your_nominations_cards_list(total_nominations, active_nominations, scheduled_nominations, completed_nominations)
        return JsonResponse({
            'data': data
        }, status=status.HTTP_200_OK)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def get_your_notifications(request):
    emp_id = int(request.GET.get(ct.EMP_ID, None))
    page = request.GET.get(ct.PAGE, '1')
    limit = request.GET.get(ct.LIMIT, '10')
    search_input = request.GET.get(ct.SEARCH_INPUT, '')
    sort_field = request.GET.get('sort_field', 'created_at')
    sort_direction = request.GET.get('sort_direction', 'desc')
    if not emp_id :
       return JsonResponse({
           'error': ct.EMP_ID_REQUIRED
       }, status=status.HTTP_400_BAD_REQUEST)
    try:
        col_data = get_nomination_list_col_data()
        row_data = list(
            ElectionModel.objects
            .filter(nominationsmodel__emp_id=emp_id)  
            .select_related('nominationsmodel') 
            .annotate(nomination_created_at=F('nominationsmodel__created_at'))
            .values('nomination_created_at', *ct.NOMINATION_LIST_FIELDS)  
        )
        total_rows = len(row_data)
        row_data = apply_search_sort_pagination(row_data, search_input, sort_field, sort_direction, page, limit)
        return JsonResponse({
            'data': {
                'col_data': col_data,
                'row_data': list(row_data),
                'total_rows': total_rows
            }
        }, status=status.HTTP_200_OK)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)