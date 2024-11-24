from django.db import models
from common import constants as ct

class ElectionModel(models.Model):
    election_id = models.AutoField(primary_key=True)  
    election_title = models.CharField(max_length=ct.CHAR_MEDIUM_LIMIT, blank=False, null=False)
    election_description = models.TextField(blank=True, null=True)
    election_cutoff = models.IntegerField(blank=True, null=True)
    election_reward = models.TextField(blank=True, null=True)
    election_eligibility = models.JSONField(blank=True, null=True)
    election_status = models.CharField(
        max_length=ct.CHAR_MEDIUM_LIMIT,
        choices=ct.ELECTION_STATUS_CHOICES,  
        default='Declared',  
        blank=True, 
        null=True
    )
    nomination_start_date = models.DateTimeField(blank=False, null=False)
    nomination_end_date = models.DateTimeField(blank=False, null=False)
    voting_start_date = models.DateTimeField(blank=False, null=False)
    voting_end_date = models.DateTimeField(blank=False, null=False)
    created_by_name = models.CharField(max_length=ct.CHAR_SHORT_LIMIT, blank=False, null=False)
    created_by_empid = models.IntegerField(blank=False, null=False) 
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = "election"
