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
