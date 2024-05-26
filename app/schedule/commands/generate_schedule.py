# app/schedule/management/commands/generate_schedule.py

from django.core.management.base import BaseCommand
from django.utils import timezone
from app.algorithm.algorithm import Algorithm
from app.infrastructure.models import Home


def handle():
    print("Cron job running")
    today = timezone.now().date()
    next_days = [today + timezone.timedelta(days=i) for i in range(1,3)]
    homes = Home.objects.all()
    for home in homes:
        for day in next_days:
            alg = Algorithm(home,day)
            alg.run()
    print("Succesfully created schedules")