from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CookieTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('api_token')
        if not token:
            return None  
        try:
            user, token = self.authenticate_credentials(token)
            return (user, token)
        except AuthenticationFailed:
            raise AuthenticationFailed("Invalid or expired token.")
