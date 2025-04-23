from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


    
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=20, null=True, blank=True)
    image = models.ImageField(upload_to='avatars/', null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    cpf = models.IntegerField(null=True, blank=True)

    @property
    def name(self):
        if self.display_name:
            return self.display_name
        return self.user.username
    
    @property
    def avatar(self):
        if self.image:
            return self.image.url
        return f'{settings.STATIC_URL}avatars/avatar.svg'
    
    def __str__(self):
        return self.name

class Address(models.Model):
    phone = models.IntegerField(null=True, blank=True)
    state = models.CharField(max_length=15)
    city = models.CharField(max_length=30)
    street = models.CharField(max_length=50)
    number = models.IntegerField()
    neighborhood = models.CharField(max_length=30)
    address_complement = models.CharField(max_length=6)
    cep = models.CharField(max_length=20)
    user = models.ForeignKey(Profile, related_name='user_address' ,on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'{self.street} | {self.state} | {self.neighborhood}'

class Color(models.Model):
    color = models.CharField(max_length=11)
    color_code = models.CharField(max_length=100)

    def __str__(self):
        return self.color

class Brand(models.Model):
    brand = models.CharField(max_length=15)

    def __str__(self):
        return self.brand

class Line(models.Model):
    line = models.CharField(max_length=30)

    def __str__(self):
        return self.line

class Order(models.Model):
    name = models.CharField(max_length=15, null=True)
    last_name = models.CharField(max_length=40, null=True)
    address = models.ForeignKey(Address, related_name='order_address', on_delete=models.SET_NULL, null=True)
    total_price = models.FloatField(null=True)
    status = models.CharField(max_length=12, default='pending')
    payment_id = models.CharField(max_length=100, blank=True, null=True)
    preference_id = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return f'{self.name} | {self.last_name}'
    
class SoccerBoot(models.Model):
    BOOT_TYPES = {
        'Campo':'Campo',
        'Salao':'Salão',
        'Suico':'Suiço',
        'Trava-Mista': 'Trava Mista',
        'Todas': 'Todas',
    }
    image = models.ImageField(upload_to='soccer_boots/', null=True)     
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True)
    line = models.ForeignKey(Line, on_delete=models.SET_NULL, null=True)
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True)
    bootie = models.BooleanField(default=False)
    price = models.FloatField()
    rating = models.IntegerField(null=True, blank=True)
    sold = models.IntegerField(null=True, blank=True)
    stock = models.IntegerField(null=True, blank=True)
    boot_type = models.CharField(max_length=11, choices=BOOT_TYPES, null=True)
    description = models.CharField(max_length=1000, null=True, blank=True)
    oders = models.ForeignKey(Order, related_name='boots', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'{self.brand} | {self.line} | {self.boot_type} | {self.color}'

class NewsLetter(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    wpp = models.CharField(max_length=11)

    def __str__(self):
        return f'{self.name} | {self.email} | {self.wpp}'

class BootInCart(models.Model):
    cart_id = models.CharField(max_length=39)
    product = models.ForeignKey(SoccerBoot, related_name='soccer_boots', on_delete=models.CASCADE, null=True)
    amount = models.IntegerField(default=0)
    size = models.IntegerField(null=True, blank=True)
    
    def __str__(self):
        return f'{self.cart_id}   ||  {self.product}'

class Question(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    question = models.CharField(max_length=1000)
    
    def __str__(self):
        return f'{self.name} | {self.question}'