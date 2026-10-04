from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from django.contrib.auth import authenticate
from django.db.models import Sum
from datetime import datetime
import jwt

from .models import Product, Order, User, Address
from .serializers import ProductSerializer, UserSerializer, AddressSerializer
from .pagination import StandardResultsSetPagination

# --- ViewSets ---
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        metal = self.request.query_params.get('metal')
        if metal:
            queryset = queryset.filter(metal_type__iexact=metal)
        return queryset

class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# --- Secure Auth (Requirement #1, #7, #12) ---
class SecureLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password) # Django uses email as username via model config

        if user:
            # Simple JWT generation (In prod use SimpleJWT library)
            token_payload = {'user_id': str(user.id), 'exp': datetime.utcnow().timestamp() + 3600}
            access_token = jwt.encode(token_payload, settings.SECRET_KEY, algorithm='HS256')

            response = Response({
                "access": access_token,
                "user": {"name": user.first_name or "User", "email": user.email, "role": "admin" if user.is_staff else "customer"}
            })

            # Requirement #1: HttpOnly Cookie for Refresh Token logic
            response.set_cookie(
                key='refresh_token',
                value='dummy_refresh_token_for_example',
                httponly=True,
                samesite='Lax',
                secure=False # Set True in production (HTTPS)
            )
            return response
        return Response({"error": "Invalid credentials"}, status=401)

# --- Admin Vault (Requirement #6) ---
class AdminVaultView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        current_month_sales = Order.objects.aggregate(total=Sum('total_amount'))['total'] or 0
        users = User.objects.all().values('id', 'first_name', 'email', 'date_joined', 'is_staff')

        return Response({
            "sales_metrics": {"month": current_month_sales},
            "users": list(users) # Password is NOT included here
        })