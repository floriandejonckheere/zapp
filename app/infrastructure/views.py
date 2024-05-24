from itertools import chain

from rest_framework import permissions, viewsets, status
from rest_framework.response import Response

from .models import Home, Device
from .serializers import HomeSerializer, DeviceSerializer, UpdateDeviceSerializer


class HomeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows homes to be viewed or edited.
    """
    model = Home
    queryset = Home.objects.all().order_by('id')
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
        return Device.objects.filter(home=home_id).order_by('id')

    def get_object(self):
        return Device.objects.get(id=self.kwargs['pk'])

    def partial_update(self, request, *args, **kwargs):
        serializer = UpdateDeviceSerializer(instance=self.get_object(), data=request.data)

        if serializer.is_valid():
            self.perform_update(serializer)
        else:
            return Response({'detail': ' '.join(list(chain.from_iterable(serializer.errors.values())))},
                            status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data)
