from django.db import models
from election_process.models.election.election_model import ElectionModel
from election_process.models.nominations.nominations_model import NominationsModel

class NomineeVoteCountModel(models.Model):
    nominee_vote_count_id = models.AutoField(primary_key=True)
    election = models.ForeignKey(ElectionModel, on_delete=models.CASCADE)
    nomination = models.ForeignKey(NominationsModel, on_delete=models.CASCADE)
    emp_id = models.IntegerField(blank=False, null=False)
    total_votes = models.IntegerField(default=0)
    last_updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "nomination_vote_count"