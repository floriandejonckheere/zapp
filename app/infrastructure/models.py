from django.db import models
from django.utils.translation import gettext_lazy as _


class Home(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    users = models.ManyToManyField('users.User')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Device(models.Model):
    class DeviceType(models.TextChoices):
        CONSUMER = "CO", _("Consumer")
        PRODUCER = "PR", _("Producer")
        STORAGE = "ST", _("Storage")
        GRID = "GR", _("Grid")

    # Primary key
    id = models.AutoField(primary_key=True)

    # Home
    home = models.ForeignKey('Home', on_delete=models.CASCADE)

    # Name
    name = models.CharField(max_length=200)

    # Type (consumer, producer, storage, or grid)
    device_type = models.CharField(max_length=2, choices=DeviceType.choices, default=DeviceType.CONSUMER)

    # Power (W)
    power = models.IntegerField(null=True)

    # Capacity (Wh)
    capacity = models.IntegerField(null=True)

    # Created at
    created_at = models.DateTimeField(auto_now_add=True)

    # Updated at
    updated_at = models.DateTimeField(auto_now=True)


class Constraint(models.Model):
    class ConstraintType(models.TextChoices):
        IN = "IN", _("In")
        OUT = "OUT", _("Out")

    # Primary key
    id = models.AutoField(primary_key=True)

    # Device
    device = models.ForeignKey('Device', on_delete=models.CASCADE)

    # Type (in or out)
    constraint_type = models.CharField(max_length=3, choices=ConstraintType.choices, default=ConstraintType.IN)

    # Start value
    start = models.IntegerField()

    # Stop value
    stop = models.IntegerField()

    # Created at
    created_at = models.DateTimeField(auto_now_add=True)

    # Updated at
    updated_at = models.DateTimeField(auto_now=True)
