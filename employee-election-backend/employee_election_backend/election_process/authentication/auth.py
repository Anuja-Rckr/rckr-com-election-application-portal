import jwt 
import requests 
from django.http import JsonResponse 
from rest_framework import status 
from rest_framework.authtoken.models import Token 
from django.contrib.auth.models import User 
from election_process.models.emp_user_mapping.emp_user_model import EmpUserModel 
from rest_framework.decorators import api_view, permission_classes 
from common import constants as ct 
from rest_framework.permissions import AllowAny 
from django.conf import settings 
from django.contrib.auth.models import Group 
from rest_framework.permissions import IsAuthenticated


def set_http_cookie(token_value, user_details,group_id): 
    """Helper function to set the JWT token as a secure HTTP cookie""" 
    response_obj = { 
        'user_name': user_details.username, 
        'email': user_details.email, 
        'user_id': user_details.id,
        'group_id': group_id
    } 
    api_response = JsonResponse({'data': response_obj}, status=status.HTTP_200_OK) 
    api_response.set_cookie( 
        'api_token',   
        token_value,   
        httponly=True,
        samesite='Lax',
        secure=False,
    ) 
    return api_response 

@api_view(['GET'])
@permission_classes([AllowAny])
def emp_auth_token(request):
    token = request.COOKIES.get('token')
    if not token:
        return JsonResponse({'error': 'Authorization token missing or invalid.'}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=['HS256'], audience=[ct.USER, ct.ADMIN])
        ext_emp_id = payload.get('employeeId')

        if not ext_emp_id:
            return JsonResponse({'error': 'ext_emp_id not found in token.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            emp_user = EmpUserModel.objects.select_related('user').get(ext_emp_id=ext_emp_id)
            user = emp_user.user
            group_id = user.groups.values_list('id', flat=True).first()
            token, created = Token.objects.get_or_create(user=user)
            return set_http_cookie(token.key, user, group_id)

        except EmpUserModel.DoesNotExist:
            api_url = settings.RCKR_LOGIN_URL
            headers = {
                "Authorization": f'Bearer {token}',
                "Content-Type": "application/json",
            }
            response = requests.get(api_url, headers=headers)
            if response.status_code != 200:
                return JsonResponse({'error': 'Failed to fetch employee data from login service.'}, status=status.HTTP_400_BAD_REQUEST)

            employee_data = response.json()

            user = User.objects.create_user(
                username=employee_data['name'],
                password='password_placeholder',  
                email=employee_data['email']
            )
            emp_user = EmpUserModel.objects.create(
                ext_emp_id=ext_emp_id,
                user=user
            )

            group, created = Group.objects.get_or_create(name=ct.USER)
            user.groups.add(group)
            user.save()
            group_id = user.groups.values_list('id', flat=True).first()

            token, created = Token.objects.get_or_create(user=user)
            return set_http_cookie(token.key, user, group_id)

    except jwt.ExpiredSignatureError:
        return JsonResponse({'error': 'Token has expired.'}, status=status.HTTP_401_UNAUTHORIZED)
    except jwt.InvalidSignatureError:
        return JsonResponse({'error': 'Invalid signature. Token might be tampered.'}, status=status.HTTP_401_UNAUTHORIZED)
    except jwt.DecodeError:
        return JsonResponse({'error': 'Malformed token.'}, status=status.HTTP_401_UNAUTHORIZED)
    except jwt.InvalidTokenError:
        return JsonResponse({'error': 'Invalid token.'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return JsonResponse({'error': f'Unexpected error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    response = JsonResponse({'message': 'Logged out successfully'})
    
    auth_cookie = next(
        (cookie for cookie in request.COOKIES if 'token' in cookie.lower()),
        None
    )
    
    if auth_cookie:
        response.delete_cookie(
            auth_cookie,
            path='/',
            samesite='Lax'
        )
    
    return response