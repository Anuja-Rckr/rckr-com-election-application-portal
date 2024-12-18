from django.http import JsonResponse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from election_process.models.emp_user_mapping.emp_user_model import EmpUserModel
from rest_framework.decorators import api_view, permission_classes
from common import constants as ct
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes([AllowAny])
def emp_auth_token(request):
    ext_emp_id = request.data.get('emp_id')
    if not ext_emp_id:
        return JsonResponse({'error': ct.EMP_ID_REQUIRED}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user_details = EmpUserModel.objects.get(ext_emp_id=ext_emp_id).user
        if user_details:
            token, created = Token.objects.get_or_create(user=user_details)
            return JsonResponse({'data': token.key}, status=status.HTTP_200_OK)
    except EmpUserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid emp_id'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)



