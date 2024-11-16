from rest_framework import serializers
from election_process.models.emp_voting.emp_voting_model import EmpVotingModel

class EmpVotingSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmpVotingModel
        fields = '__all__'
        