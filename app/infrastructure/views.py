from rest_framework import permissions, viewsets

from .models import Home
from .serializers import HomeSerializer


class HomeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows homes to be viewed or edited.
    """
    queryset = Home.objects.all().order_by('-created_at')
    serializer_class = HomeSerializer
    permission_classes = [permissions.IsAuthenticated]
