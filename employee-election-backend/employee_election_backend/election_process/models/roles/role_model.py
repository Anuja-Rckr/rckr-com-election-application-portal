from django.db import models
from common import constants as ct

class RoleModel(models.Model):
    role_id = models.AutoField(primary_key=True)
    role_name = models.CharField(max_length=ct.CHAR_MEDIUM_LIMIT, blank=False, null=False)

    class Meta:
        db_table = "roles"
