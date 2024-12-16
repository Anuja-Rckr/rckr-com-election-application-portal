from django.db import models
from common import constants as ct
from election_process.models.roles.role_model import RoleModel

class UserModel(models.Model):
    user_id = models.AutoField(primary_key=True)
    emp_id = models.IntegerField(blank=False, null=False, unique=True)
    role_id = models.ForeignKey(RoleModel, on_delete=models.CASCADE, db_column="role_id")
    emp_name = models.CharField(max_length=ct.CHAR_MEDIUM_LIMIT, blank=False, null=False)
    emp_email = models.EmailField(blank=False, null=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "users"