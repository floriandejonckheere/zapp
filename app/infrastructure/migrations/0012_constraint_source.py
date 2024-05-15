# Generated by Django 5.0.6 on 2024-05-15 18:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('infrastructure', '0011_schedule_scheduleelement'),
    ]

    operations = [
        migrations.AddField(
            model_name='constraint',
            name='source',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='source', to='infrastructure.device'),
        ),
    ]
