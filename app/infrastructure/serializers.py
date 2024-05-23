from rest_framework import serializers

from .models import Home, Device, Constraint


class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = ['id', 'name', 'address']


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['id', 'name', 'device_type', 'priority', 'power', 'capacity']


class ConstraintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Constraint
        fields = ['id', 'constraint_type', 'constraint_direction', 'start', 'stop']
