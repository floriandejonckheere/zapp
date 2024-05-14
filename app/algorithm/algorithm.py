import sys

sys.path.append('.')

from app.algorithm.constraint import CostConstraint, TimeConstraint
from app.algorithm.device import Device
from app.algorithm.prediction import Prediction

# Fixed devices
house = Device(name='House', device_type='consumer')
grid = Device(name='Grid', device_type='grid')

# Variable (user-defined) devices
solar_panel = Device(name='Solar Panel', device_type='producer', power=5000)
battery = Device(name='Battery', device_type='storage', capacity=15000)
ev = Device(name='Electric Vehicle', device_type='consumer', power=7200, capacity=40000)
hvac = Device(name='HVAC', device_type='consumer', power=3000)

devices = (house, grid, solar_panel, battery, ev, hvac)

# Time-based constraints
ev.constraints = [
    # EV can only charge between 22:00 and 06:00
    TimeConstraint(constraint_type='in', start=22, stop=24),
    TimeConstraint(constraint_type='in', start=0, stop=6)
]

# Cost-based constraints
grid.constraints = [
    # Energy can only be exported to the grid if the price is positive (i.e., grid energy demand is high)
    CostConstraint(constraint_type='out', start=0, stop=999),

    # Energy can only be imported from the grid if the price is negative (i.e., grid energy demand is low)
    CostConstraint(constraint_type='in', start=-999, stop=0),
]
solar_panel.constraints = [
    # Solar panel can only produce energy if the price is positive (i.e., excess energy can be sold to the grid)
    TimeConstraint(constraint_type='out', start=0, stop=999),
]

# Power-based constraints
battery.constraints = [
    # Battery can only charge if the power is positive (i.e., excess energy from solar panel)
    CostConstraint(constraint_type='in', start=0, stop=999),

    # Battery can only discharge if the power is negative (i.e., energy demand exceeds solar panel production)
    CostConstraint(constraint_type='out', start=-999, stop=0),
]

# Historical data
historical_temperature = []
historical_cloud_cover = []
historical_direct_radiation = []
historical_diffuse_radiation = []
historical_direct_normal_irradiance = []
historical_consumption = []

# Predictions
predicted_temperature = [9.4, 9.0, 8.6, 8.9, 10.1, 12.1, 14.2, 16.1, 17.6, 18.9, 20.0, 20.7, 21.2, 21.3, 21.1, 20.5,
                         19.7, 18.5, 17.1, 15.4, 13.8, 12.5, 11.4, 10.5]

predicted_cost = [-0.15, -0.11, -0.05, 0.21, 5.46, 17.39, 37.89, 25.63, 7.06, 0.22, -0.93, -1.05, -0.95, -0.09, 1.73,
                  6.95, 13.21, 12.11, 6.63, 8.71, 8.19, 6.03, 3.23, 1.10]


def main():
    # Algorithm step 1: train model on historical data
    # TODO

    predicted_production = [0, 0, 0, 0, 0, 100, 200, 300, 500, 700, 1000, 1200, 1500, 2000, 2000, 2000, 2000, 2000,
                            1800, 1300, 800, 500, 100, 0]
    predicted_consumption = [100, 100, 200, 200, 400, 400, 500, 800, 800, 600, 400, 300, 600, 200, 100, 300, 300, 700,
                             900, 2000, 2400, 2000, 1500, 300]
    predictions = [
        Prediction(
            time=i,
            production=predicted_production[i],
            consumption=predicted_consumption[i],
            cost=cost,
        ) for i, (temperature, cost) in enumerate(zip(predicted_temperature, predicted_cost))
    ]

    # Print predictions
    for prediction in predictions:
        print(prediction)

    # Algorithm step 2: generate smart energy schedule based on predictions
    power_yield = []
    energy_schedule = {device.name: [] for device in devices}

    for i in range(0, 24):
        # Calculate power yield
        power_yield.append(predicted_production[i] - predicted_consumption[i])

        # Calculate energy schedule
        for device in devices:
            power = device.validate(predictions[i])

            energy_schedule[device.name].append(power)

    # Print yield
    print(power_yield)

    # Print energy schedules
    for device, power_schedule in energy_schedule.items():
        print(f"{device}: {power_schedule}")


if __name__ == '__main__':
    main()
