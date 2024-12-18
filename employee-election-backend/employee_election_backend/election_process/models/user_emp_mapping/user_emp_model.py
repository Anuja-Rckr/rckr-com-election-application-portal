from django.db import models
from django.contrib.auth.models import User

class UserEmpModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  
    emp_id = models.IntegerField(blank=False, null=False)    
    group_id = models.IntegerField(blank=False, null=False) 

    class Meta:
        db_table = "user_emp"
