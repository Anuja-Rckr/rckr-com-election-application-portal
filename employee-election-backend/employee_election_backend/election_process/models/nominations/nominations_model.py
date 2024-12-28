from django.db import models
from common import constants as ct
from election_process.models.election.election_model import ElectionModel 
from django.contrib.auth.models import User


class NominationsModel(models.Model):
    nomination_id = models.AutoField(primary_key=True)
    election = models.ForeignKey(ElectionModel, on_delete=models.CASCADE)
    rckr_emp_id = models.IntegerField(blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    user_name = models.CharField(max_length=ct.CHAR_MEDIUM_LIMIT, blank=False, null=False)
    appeal = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "nominations"