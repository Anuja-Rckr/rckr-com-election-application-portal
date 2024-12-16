from rest_framework import serializers
from election_process.models.users.users_model import UserModel

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
        