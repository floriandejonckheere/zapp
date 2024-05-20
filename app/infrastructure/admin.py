from django.contrib import admin

from .models import Home, Device, Constraint, Prediction, Schedule, ScheduleElement

admin.site.register(Home)
admin.site.register(Device)
admin.site.register(Constraint)
admin.site.register(Prediction)
admin.site.register(Schedule)
admin.site.register(ScheduleElement)
