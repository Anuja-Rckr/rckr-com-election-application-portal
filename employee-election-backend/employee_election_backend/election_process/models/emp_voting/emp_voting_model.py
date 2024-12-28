from django.db import models
from common import constants as ct
from election_process.models.election.election_model import ElectionModel
from django.contrib.auth.models import User


class EmpVotingModel(models.Model):
    emp_vote_id = models.AutoField(primary_key=True)
    election = models.ForeignKey(ElectionModel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    user_name = models.CharField(max_length=ct.CHAR_MEDIUM_LIMIT, blank=False, null=False)
    voted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "emp_voting"