from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group, User as DjangoUser
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DjangoUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'groups']


class CreateUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DjangoUser
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def create(self, validated_data):
        # Hash the password
        validated_data['password'] = make_password(validated_data['password'])

        user = super().create(validated_data)

        # Create linked user
        User.objects.create(user=user)

        return user


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
