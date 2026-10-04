from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, AddressViewSet, SecureLoginView, AdminVaultView

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'addresses', AddressViewSet, basename='address')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', SecureLoginView.as_view(), name='secure-login'),
    path('admin-vault/', AdminVaultView.as_view(), name='admin-vault'),
]
