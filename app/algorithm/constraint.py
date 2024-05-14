class Constraint:
    TYPES = ['in', 'out']

    def __init__(self, constraint_type, start, stop):
        if constraint_type not in self.TYPES:
            raise ValueError(f"Constraint type must be one of {self.TYPES}")

        self.constraint_type = constraint_type
        self.start = start
        self.stop = stop

    def validate(self, value):
        raise NotImplementedError


class TimeConstraint(Constraint):
    def validate(self, prediction):
        # Check if the current time is within the constraint
        return self.start <= prediction.time.hour <= self.stop


class CostConstraint(Constraint):
    def validate(self, prediction):
        # Check if the current (predicted) cost is within the constraint
        return self.start <= prediction.cost <= self.stop
