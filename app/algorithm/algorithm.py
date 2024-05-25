from app.schedule.models import Schedule, Prediction, ScheduleElement


class Context:
    def __init__(self, hour, power, price):
        self.hour = hour
        self.power = power
        self.price = price


class Algorithm:
    def __init__(self, home, date):
        self.home = home
        self.date = date

    def run(self):
        schedule = Schedule.objects.filter(home=self.home, date=self.date).first()

        # Don't do anything if the schedule is already created
        if schedule:
            return schedule

        # Fetch prediction
        prediction = Prediction.objects.filter(home=self.home, date=self.date).first()

        if not prediction:
            raise Exception(f'No prediction found for date {self.date}')

        # Create a new schedule
        schedule = Schedule(home=self.home, date=self.date)
        schedule.save()

        # Generate contexts
        contexts = [Context(i, prediction.production[i], prediction.price[i]) for i in range(24)]

        # Calculate energy schedule for each device
        for device in self.home.device_set.all():
            power = []

            # Calculate power input/output for each context
            for context in contexts:
                power.append(device.power_in_context(context))

            # Create a new schedule element
            schedule_element = ScheduleElement(schedule=schedule, device=device, power=power)
            schedule_element.save()

        # Return the schedule
        return schedule
