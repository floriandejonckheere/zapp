# Generated by Django 5.0.6 on 2024-05-23 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('infrastructure', '0014_remove_schedule_home_remove_scheduleelement_schedule_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='device',
            name='priority',
            field=models.IntegerField(default=0),
        ),
    ]
