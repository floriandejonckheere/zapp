from django.db import models
from django.utils.translation import gettext_lazy as _


class Home(models.Model):
    # Primary key
    id = models.AutoField(primary_key=True)

    # Name
    name = models.CharField(max_length=200)

    # Address
    address = models.CharField(max_length=200)

    # Users
    users = models.ManyToManyField('users.User')

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Device(models.Model):
    class DeviceType(models.TextChoices):
        CONSUMER = "CO", _("Consumer")
        PRODUCER = "PR", _("Producer")
        STORAGE = "ST", _("Storage")
        GRID = "GR", _("Grid")

    class SourceType(models.TextChoices):
        PV = "SO", _("Solar panel")
        BA = "BA", _("Battery")
        GR = "GR", _("Grid")

    # Primary key
    id = models.AutoField(primary_key=True)

    # Home
    home = models.ForeignKey('Home', on_delete=models.CASCADE)

    # Name
    name = models.CharField(max_length=200)

    # Type (consumer, producer, storage, or grid)
    device_type = models.CharField(max_length=2, choices=DeviceType.choices, default=DeviceType.CONSUMER)

    # Priority
    priority = models.IntegerField(null=True, blank=True)

    # Power (W)
    power = models.IntegerField(null=True, blank=True)

    # Capacity (Wh)
    capacity = models.IntegerField(null=True, blank=True)

    # Time constraint (input)
    start_time_in = models.IntegerField(null=True, blank=True)
    stop_time_in = models.IntegerField(null=True, blank=True)

    # Time constraint (output)
    start_time_out = models.IntegerField(null=True, blank=True)
    stop_time_out = models.IntegerField(null=True, blank=True)

    # Price constraint (input)
    start_price_in = models.FloatField(null=True, blank=True)
    stop_price_in = models.FloatField(null=True, blank=True)

    # Price constraint (output)
    start_price_out = models.FloatField(null=True, blank=True)
    stop_price_out = models.FloatField(null=True, blank=True)

    # Source constraint
    source_in = models.CharField(max_length=2, null=True, blank=True, choices=SourceType.choices)
    source_out = models.CharField(max_length=2, null=True, blank=True, choices=SourceType.choices)

    # Power constraint (in)
    power_in = models.IntegerField(null=True, blank=True)
    power_out = models.IntegerField(null=True, blank=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
