from rest_framework import permissions, viewsets

from .models import Schedule, ScheduleElement, Prediction
from .serializers import ScheduleSerializer, ScheduleElementSerializer, PredictionSerializer


class ScheduleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows schedules to be viewed or edited.
    """
    model = Schedule
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        home_id = self.kwargs['home_id']
        date = self.kwargs.get('date')
        return Schedule.objects.filter(home=home_id, date=date)


class ScheduleElementViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows schedule elements to be viewed or edited.
    """
    model = ScheduleElement
    serializer_class = ScheduleElementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        schedule_id = self.kwargs['schedule_id']
        return ScheduleElement.objects.filter(schedule=schedule_id)


class PredictionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows predictions to be viewed or edited.
    """
    model = Prediction
    serializer_class = PredictionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        home_id = self.kwargs['home_id']
        date = self.kwargs.get('date')
        return Prediction.objects.filter(home=home_id, date=date)
