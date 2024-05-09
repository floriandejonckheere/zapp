from itertools import chain

from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from app.users.serializers import GroupSerializer, UserSerializer, CreateUserSerializer, UpdateUserSerializer, UpdatePasswordSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    create_serializer_class = CreateUserSerializer
    update_serializer_class = UpdateUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]

        return super().get_permissions()

    @action(detail=False, methods=['get'], url_path='me', url_name='me')
    def me(self, request):
        serializer = UserSerializer(request.user)

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = CreateUserSerializer(data=request.data)

        if serializer.is_valid():
            self.perform_create(serializer)
        else:
            return Response({'detail': ' '.join(list(chain.from_iterable(serializer.errors.values())))}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        if 'password' in request.data:
            serializer = UpdatePasswordSerializer(instance=self.get_object(), data={'password': request.data['password']})
        else:
            serializer = UpdateUserSerializer(instance=self.get_object(), data=request.data)

        if serializer.is_valid():
            self.perform_update(serializer)
        else:
            return Response({'detail': ' '.join(list(chain.from_iterable(serializer.errors.values())))}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
