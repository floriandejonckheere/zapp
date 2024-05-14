class Device:
    TYPES = ['consumer', 'producer', 'storage', 'grid']

    def __init__(self, name, device_type, power=None, capacity=None, constraints=[]):
        if device_type not in self.TYPES:
            raise ValueError(f"Device type must be one of {self.TYPES}")

        # Device name
        self.name = name

        # Type (consumer, producer, storage, or grid)
        self.device_type = device_type

        # Power (W)
        self.power = power

        # Capacity (Wh)
        self.capacity = capacity

        # Constraints
        self.constraints = constraints

    def validate(self, prediction):
        # If no constraints are defined, return 1 (i.e. always consuming power)
        if not any(self.constraints):
            return 1

        # Calculate the power production/consumption based on the constraints
        power_in = sum(
            constraint.validate(prediction) for constraint in self.constraints if constraint.constraint_type == 'in')
        power_out = sum(
            constraint.validate(prediction) for constraint in self.constraints if constraint.constraint_type == 'out')

        # Calculate the net power consumption
        total_power = power_in - power_out

        # Apply the device power (if defined)
        if self.power:
            total_power *= self.power

        return total_power
