from django.contrib.postgres.fields import ArrayField
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

    # Primary key
    id = models.AutoField(primary_key=True)

    # Home
    home = models.ForeignKey('Home', on_delete=models.CASCADE)

    # Name
    name = models.CharField(max_length=200)

    # Type (consumer, producer, storage, or grid)
    device_type = models.CharField(max_length=2, choices=DeviceType.choices, default=DeviceType.CONSUMER)

    # Power (W)
    power = models.IntegerField(null=True, blank=True)

    # Capacity (Wh)
    capacity = models.IntegerField(null=True, blank=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Constraint(models.Model):
    class ConstraintType(models.TextChoices):
        TIME = "TI", _("Time")
        COST = "CO", _("Cost")
        SOURCE = "SO", _("Source")

    class ConstraintDirection(models.TextChoices):
        IN = "IN", _("In")
        OUT = "OUT", _("Out")

    # Primary key
    id = models.AutoField(primary_key=True)

    # Device
    device = models.ForeignKey('Device', on_delete=models.CASCADE)

    # Type
    constraint_type = models.CharField(max_length=2, choices=ConstraintType.choices, default=ConstraintType.TIME)

    # Direction
    constraint_direction = models.CharField(max_length=3, choices=ConstraintDirection.choices,
                                            default=ConstraintDirection.IN)

    # Start value
    start = models.IntegerField()

    # Stop value
    stop = models.IntegerField()

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.constraint_type} {self.constraint_direction} ({self.start} - {self.stop})'


class Prediction(models.Model):
    # Primary key
    id = models.AutoField(primary_key=True)

    # Home
    home = models.ForeignKey('Home', on_delete=models.CASCADE)

    # Date
    date = models.DateField()

    # Predicted energy production (W)
    production = ArrayField(models.IntegerField(), size=24)

    # Predicted energy consumption (W)
    consumption = ArrayField(models.IntegerField(), size=24)

    # Predicted cost (c€/kWh)
    cost = ArrayField(models.FloatField(), size=24)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.home.name} ({self.date})'
