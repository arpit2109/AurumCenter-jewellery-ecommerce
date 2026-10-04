from rest_framework import serializers
from .models import User, Product, ProductImage, Address, Order

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image_url', 'is_primary']

class ProductSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'title', 'slug', 'price', 'stock', 'description', 'metal_type', 'images']

    def get_images(self, obj):
        return [img.image_url for img in obj.images.all()]

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street', 'city', 'zip_code', 'country', 'is_default']

class UserSerializer(serializers.ModelSerializer):
    # We intentionally exclude password/security fields
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'is_staff', 'date_joined']