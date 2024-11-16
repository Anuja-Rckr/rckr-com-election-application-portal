from rest_framework import serializers
from election_process.models.nominee_vote_count.nominee_vote_count_model import NomineeVoteCountModel

class NomineeVoteCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = NomineeVoteCountModel
        fields = '__all__'
         