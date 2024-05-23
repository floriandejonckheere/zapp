from rest_framework import permissions, viewsets

from .models import Home, Device
from .serializers import HomeSerializer, DeviceSerializer


class HomeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows homes to be viewed or edited.
    """
    model = Home
    queryset = Home.objects.all().order_by('name')
    serializer_class = HomeSerializer
    permission_classes = [permissions.IsAuthenticated]


class DeviceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows devices to be viewed or edited.
    """
    model = Device
    serializer_class = DeviceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        home_id = self.kwargs['home_id']
        return Device.objects.filter(home=home_id)
