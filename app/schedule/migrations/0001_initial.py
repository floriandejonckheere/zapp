# Generated by Django 5.0.6 on 2024-05-20 08:58

import django.contrib.postgres.fields
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('infrastructure', '0014_remove_schedule_home_remove_scheduleelement_schedule_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Prediction',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('production', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=24)),
                ('consumption', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=24)),
                ('cost', django.contrib.postgres.fields.ArrayField(base_field=models.FloatField(), size=24)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('home', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='infrastructure.home')),
            ],
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('home', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='infrastructure.home')),
            ],
        ),
        migrations.CreateModel(
            name='ScheduleElement',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('power', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=24)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('device', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='infrastructure.device')),
                ('schedule', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schedule.schedule')),
            ],
        ),
    ]
