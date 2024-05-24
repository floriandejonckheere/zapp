from rest_framework import serializers

from .models import Home, Device


class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = ['id', 'name', 'address']


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = [
            'id',
            'name',
            'device_type',
            'priority',
            'power',
            'capacity',
            'start_time_in',
            'stop_time_in',
            'start_time_out',
            'stop_time_out',
            'start_price_in',
            'stop_price_in',
            'start_price_out',
            'stop_price_out',
            'source_in',
            'source_out',
            'power_in',
            'power_out',
        ]


class UpdateDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = [
            'priority',
            'start_time_in',
            'stop_time_in',
            'start_time_out',
            'stop_time_out',
            'start_price_in',
            'stop_price_in',
            'start_price_out',
            'stop_price_out',
            'source_in',
            'source_out',
            'power_in',
            'power_out',
        ]
