from rest_framework import serializers

from .models import Home


class HomeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Home
        fields = ['id', 'name', 'address']
