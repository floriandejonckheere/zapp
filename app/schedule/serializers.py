from rest_framework import serializers

from .models import Prediction, Schedule, ScheduleElement
from ..infrastructure.serializers import DeviceSerializer


class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = ['id', 'home', 'date', 'production', 'consumption', 'price']


class ScheduleElementSerializer(serializers.ModelSerializer):
    device = DeviceSerializer()

    class Meta:
        model = ScheduleElement
        fields = ['id', 'schedule', 'device', 'power']


class ScheduleSerializer(serializers.ModelSerializer):
    elements = ScheduleElementSerializer(source='scheduleelement_set', read_only=True, many=True)

    class Meta:
        model = Schedule
        depth = 1
        fields = ['id', 'home', 'date', 'elements']
