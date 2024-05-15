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

    id = models.AutoField(primary_key=True)
    home = models.ForeignKey('Home', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    device_type = models.CharField(max_length=2, choices=DeviceType.choices, default=DeviceType.CONSUMER)
