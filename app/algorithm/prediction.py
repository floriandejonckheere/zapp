class Prediction:
    def __init__(self, time, production, consumption, cost):
        self.time = time
        self.production = production
        self.consumption = consumption
        self.cost = cost

    def __repr__(self):
        return f"Prediction(time={self.time}, production={self.production}, consumption={self.consumption}, cost={self.cost})"
