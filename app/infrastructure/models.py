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
    class Category(models.TextChoices):
        SOLAR_PANEL = "SP", _("Solar panel")
        BATTERY = "BA", _("Battery")
        ELECTRIC_VEHICLE = "EV", _("Electric vehicle")
        HEAT_PUMP = "HP", _("Heat pump")
        OTHER = "OT", _("Other")

    id = models.AutoField(primary_key=True)
    home = models.ForeignKey('Home', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=200, choices=Category.choices, default=Category.OTHER)
