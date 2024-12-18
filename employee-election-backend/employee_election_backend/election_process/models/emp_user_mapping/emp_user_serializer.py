from rest_framework import serializers

from election_process.models.user_emp_mapping.user_emp_model import UserEmpModel

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEmpModel
        fields = '__all__'