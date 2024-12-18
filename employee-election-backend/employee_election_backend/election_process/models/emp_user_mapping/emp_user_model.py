from django.db import models
from django.contrib.auth.models import User

class EmpUserModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  
    ext_emp_id = models.IntegerField(blank=False, null=False, unique=True)    

    class Meta:
        db_table = "emp_user"
