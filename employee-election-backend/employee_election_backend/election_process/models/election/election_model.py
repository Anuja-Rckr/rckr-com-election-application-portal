from django.db import models
from common import constants as ct

class ElectionModel(models.Model):
    election_id = models.AutoField(primary_key=True)  
    election_title = models.CharField(max_length=ct.CHAR_MEDIUM_LIMIT, blank=False, null=False)
    election_description = models.TextField(blank=True, null=True)
    election_reward = models.TextField(blank=True, null=True)
    election_eligibility = models.JSONField(blank=True, null=True)
    nomination_start_date = models.DateTimeField(blank=True, null=True)
    nomination_end_date = models.DateTimeField(blank=True, null=True)
    voting_start_date = models.DateTimeField(blank=True, null=True)
    voting_end_date = models.DateTimeField(blank=True, null=True)
    created_by_name = models.CharField(max_length=ct.CHAR_SHORT_LIMIT, blank=True, null=True)
    created_by_empid = models.IntegerField(blank=True, null=True) 
    results_published_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    election_total_votes = models.IntegerField(blank=False, null=False)
    
    class Meta:
        db_table = "election"
