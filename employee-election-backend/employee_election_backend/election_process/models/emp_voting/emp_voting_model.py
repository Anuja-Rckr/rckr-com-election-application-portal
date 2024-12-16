from django.db import models
from common import constants as ct
from election_process.models.election.election_model import ElectionModel

class EmpVotingModel(models.Model):
    emp_vote_id = models.AutoField(primary_key=True)
    election = models.ForeignKey(ElectionModel, on_delete=models.CASCADE)
    rckr_emp_id = models.IntegerField(blank=False, null=False)
    emp_name = models.CharField(max_length=ct.CHAR_MEDIUM_LIMIT, blank=False, null=False)
    voted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "emp_voting"