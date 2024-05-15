from django.contrib import admin

from .models import Home, Device, Constraint, Prediction

admin.site.register(Home)
admin.site.register(Device)
admin.site.register(Constraint)
admin.site.register(Prediction)
