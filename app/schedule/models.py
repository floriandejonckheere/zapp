from django.contrib.postgres.fields import ArrayField
from django.db import models


class Prediction(models.Model):
    # Primary key
    id = models.AutoField(primary_key=True)

    # Home
    home = models.ForeignKey('infrastructure.Home', on_delete=models.CASCADE)

    # Date
    date = models.DateField()

    # Predicted energy production (W), per hour
    production = ArrayField(models.IntegerField(), size=24)

    # Predicted energy consumption (W), per hour
    consumption = ArrayField(models.IntegerField(), size=24)

    # Predicted price (c€/kWh), per hour
    price = ArrayField(models.FloatField(), size=24)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.home.name} ({self.date})'


class Schedule(models.Model):
    # Primary key
    id = models.AutoField(primary_key=True)

    # Home
    home = models.ForeignKey('infrastructure.Home', on_delete=models.CASCADE)

    # Date
    date = models.DateField()

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ScheduleElement(models.Model):
    # Primary key
    id = models.AutoField(primary_key=True)

    # Schedule
    schedule = models.ForeignKey('Schedule', on_delete=models.CASCADE)

    # Device
    device = models.ForeignKey('infrastructure.Device', on_delete=models.CASCADE)

    # Predicted energy consumption (W), per hour
    power = ArrayField(models.IntegerField(), size=24)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
