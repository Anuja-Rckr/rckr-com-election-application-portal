# Generated by Django 5.1.3 on 2024-12-03 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('election_process', '0006_alter_electionmodel_created_by_empid_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='electionmodel',
            name='results_published_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
