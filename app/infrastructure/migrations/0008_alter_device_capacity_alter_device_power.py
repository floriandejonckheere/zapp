# Generated by Django 5.0.6 on 2024-05-15 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('infrastructure', '0007_prediction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='device',
            name='capacity',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='device',
            name='power',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
