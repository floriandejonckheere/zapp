from django.contrib import admin

from .models import Prediction, Schedule, ScheduleElement

admin.site.register(Prediction)
admin.site.register(Schedule)
admin.site.register(ScheduleElement)
