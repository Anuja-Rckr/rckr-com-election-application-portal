# Generated by Django 5.1.3 on 2024-12-28 11:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('election_process', '0019_alter_empusermodel_ext_emp_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='empvotingmodel',
            old_name='emp_name',
            new_name='user_name',
        ),
        migrations.RenameField(
            model_name='nominationsmodel',
            old_name='emp_name',
            new_name='user_name',
        ),
    ]
