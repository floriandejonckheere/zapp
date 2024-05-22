from app.infrastructure.models import Constraint
from app.schedule.models import Schedule, Prediction, ScheduleElement


class Algorithm:
    def __init__(self, home, date):
        self.home = home
        self.date = date

    def run(self):
        # Don't do anything if the schedule is already created
        if Schedule.objects.filter(home=self.home, date=self.date).exists():
            return

        # Create a new schedule
        schedule = Schedule(home=self.home, date=self.date)
        schedule.save()

        # Calculate power yield
        _power_yield = [self.power_yield_for(i) for i in range(24)]

        # Calculate energy schedule for each device
        for device in self.home.device_set.all():
            # Power consumption (negative) or production (positive)
            power_in = [-1 for _ in range(24)]
            power_out = [1 for _ in range(24)]

            # Validate constraint
            for constraint in device.constraint_set.all():
                if constraint.constraint_direction == Constraint.ConstraintDirection.IN:
                    constraint.validate(power_in, self.prediction())
                else:
                    constraint.validate(power_out, self.prediction())

            # Combine power consumption and production
            power = [power_in[i] + power_out[i] for i in range(24)]

            # Save the device schedule
            schedule_element = ScheduleElement(schedule=schedule, device=device, power=power)
            schedule_element.save()

        # Return the schedule
        return schedule

    def power_yield_for(self, i):
        return self.prediction().production[i] - self.prediction().consumption[i]

    def prediction(self):
        return Prediction.objects.get(home=self.home, date=self.date)
