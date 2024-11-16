from rest_framework import serializers
from election_process.models.nominations.nominations_model import NominationsModel

class NominationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NominationsModel
        fields = '__all__'
         