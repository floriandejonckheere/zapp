"""
URL configuration for zapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from app.infrastructure import views as infrastructure_views
from app.users import views as user_views

router = routers.SimpleRouter(trailing_slash=False)
router.register(r'users', user_views.UserViewSet)
router.register(r'groups', user_views.GroupViewSet)
router.register(r'homes', infrastructure_views.HomeViewSet)
router.register('homes/(?P<home_id>.+)/devices$', infrastructure_views.DeviceViewSet, basename='devices')
router.register('homes/(?P<home_id>.+)/devices/(?P<device_id>.+)/constraints$', infrastructure_views.ConstraintViewSet,
                basename='constraints')

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include(router.urls)),

    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
