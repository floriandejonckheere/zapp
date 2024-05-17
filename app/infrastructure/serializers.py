from rest_framework import serializers

from .models import Home, Device, Constraint


class HomeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Home
        fields = ['id', 'name', 'address']


class DeviceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Device
        fields = ['id', 'name', 'device_type', 'power', 'capacity']


class ConstraintSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Constraint
        fields = ['id', 'constraint_type', 'constraint_direction', 'start', 'stop']
