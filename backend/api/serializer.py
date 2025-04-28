from rest_framework import serializers
from .models import NewsLetter, SoccerBoot, BootInCart, Brand, Color, BootInCart, Address, Order, Question, Line, Profile
from django.contrib.auth.models import User



class NewsLetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsLetter
        fields = '__all__'


class SoccerBootSerializer(serializers.ModelSerializer):
    brand = serializers.SlugRelatedField(slug_field='brand', read_only=True, required=False, allow_null=True)
    line = serializers.SlugRelatedField(slug_field='line', read_only=True, required=False, allow_null=True)
    color = serializers.SlugRelatedField(slug_field='color', read_only=True, required=False, allow_null=True)
    
    class Meta:
        model = SoccerBoot
        fields = ['id','brand', 'line', 'color', 'price', 'rating', 'image']
    def to_representation(self, instance):
        representation = super().to__representation(instance)
        if instance.image:
            representation['image'] = instance.image.url
            print(representation['image'])
        return representation
    
class BookInChartSerializer(serializers.ModelSerializer):
    class Meta:
        model = BootInCart
        fields = '__all__'
        
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['brand']
        
class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['color', 'color_code']
        
class BootInCartSerializer(serializers.ModelSerializer):
    product = SoccerBootSerializer(read_only=True)

    class Meta:
        model = BootInCart
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        
class OrderSerializer(serializers.ModelSerializer):
    boots = BootInCartSerializer(many=True, read_only=True)
    address = AddressSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = '__all__'
    
class QuestionSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Question
        fields = '__all__'
        
class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = '__all__'

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        
    def create(self, validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.SlugRelatedField(slug_field='username', read_only=True)
    class Meta:
        model = Profile
        fields = ['username']