from election_process.models.election.election_model import ElectionModel
from rest_framework import serializers

class ElectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectionModel
        fields = '__all__'
        