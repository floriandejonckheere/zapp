from django.core.management.base import BaseCommand

from app.algorithm.algorithm import Algorithm
from app.infrastructure.models import Home, Device
from app.schedule.models import Prediction


class Command(BaseCommand):
    help = "Generate smart energy schedule"

    def handle(self, **options):
        home = Home.objects.get(pk=1)
        date = '2024-05-26'

        # Remove existing schedule
        home.schedule_set.filter(date=date).delete()

        # Generate schedule
        schedule = Algorithm(home=home, date=date).run()

        # Print prediction
        prediction = Prediction.objects.get(home=home, date=date)

        self.stdout.write('== Prediction')
        self.stdout.write(f'Hour:        {[i for i in range(24)]}')
        self.stdout.write(f'Production:  {prediction.production}')
        self.stdout.write(f'Price:       {prediction.price}')

        self.stdout.write('\n\n')

        # Print device constraints
        for device in Device.objects.all():
            constraints = {
                'start_time_in': device.start_time_in,
                'stop_time_in': device.stop_time_in,
                'start_time_out': device.start_time_out,
                'stop_time_out': device.stop_time_out,
                'start_price_in': device.start_price_in,
                'stop_price_in': device.stop_price_in,
                'start_price_out': device.start_price_out,
                'stop_price_out': device.stop_price_out,
                'source_in': device.source_in,
                'source_out': device.source_out,
                'power_in': device.power_in,
                'power_out': device.power_out,
            }

            self.stdout.write(f'== Device: {device.name}')

            # Compact constraints and print them
            for key, value in constraints.items():
                if value is not None:
                    self.stdout.write(f'{key} = {value}')
            self.stdout.write('\n')

        self.stdout.write('\n\n')

        # Print schedule
        self.stdout.write('== Schedule')
        for schedule_element in schedule.scheduleelement_set.all():
            self.stdout.write(f'{schedule_element.device.name}: {schedule_element.power}')
