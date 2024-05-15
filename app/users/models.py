from django.contrib.auth.models import User as DjangoUser
from django.db import models


class User(models.Model):
    # Django user
    user = models.OneToOneField(DjangoUser, on_delete=models.CASCADE)

    # Homes
    homes = models.ManyToManyField('infrastructure.Home')

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username
