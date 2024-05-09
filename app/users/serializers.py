from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group, User
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'groups']


class CreateUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def create(self, validated_data):
        # Hash the password
        validated_data['password'] = make_password(validated_data['password'])

        return super().create(validated_data)


class UpdateUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']


class UpdatePasswordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['password']

    def update(self, instance, validated_data):
        # Hash the password
        validated_data['password'] = make_password(validated_data['password'])

        return super().update(instance, validated_data)


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']
