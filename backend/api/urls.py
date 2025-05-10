from django.urls import path
from .views import register_news_consumer, see_news_consumer, get_soccer_boots,add_boot_to_cart, get_brands, get_colors, get_boots_in_cart, increase_boot_amount_in_cart
from .views import registry_products, get_lines, CustomTokenObtainPairView,CustomRefreshTokenView, is_authenticated, register, logout, registry_line, registry_brand, registry_color
from .views import decrease_boot_amount_in_cart,finish_order,remove_boot_from_cart, get_filtered_boot,register_new_question
from .apimp import create_mercado_pago_preference, get_webhook



urlpatterns = [
    #auth
    path('token', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('is_authenticated', is_authenticated),
    path('register', register),
    path('logout', logout),
    
    path('list_newsletter_consumers', see_news_consumer, name='list_news_consumer'),
    path('create_newsletter_consumer', register_news_consumer, name='create_news_consumer'),
    path('get_soccer_boots', get_soccer_boots, name='get_soccer_boots'),
    path('add_boot_to_cart', add_boot_to_cart, name='add_to_cart'),
    path('get_brands', get_brands, name='get_brands'),
    path('get_colors', get_colors, name='get_colors'),
    path('get_lines', get_lines, name='get_lines'),
    path('get_boots_in_cart', get_boots_in_cart, name='get_boots_in_cart' ),
    path('increase_boot_amount_in_cart', increase_boot_amount_in_cart, name='increase_boot_amount_in_cart'),
    path('decrease_boot_amount_in_cart', decrease_boot_amount_in_cart, name='decrease_boot_amount_in_cart'),
    path('finish_order', finish_order, name='finish_order'),
    path('remove_boot_from_cart', remove_boot_from_cart, name='remove_boot_from_cart'),
    path('get_filtered_boots', get_filtered_boot, name='get_filtered_boot' ),
    path('send_question', register_new_question, name='register_newquestion'),
    
    #mp
    path('create_mercado_pago_preference', create_mercado_pago_preference, name='create_mercado_pago_preference'),
    path('get_webhook', get_webhook, name='get_webhook'),
    
    #admin
    path('registry_product', registry_products, name="registry_products"),
    path('registry_line', registry_line),
    path('registry_brand', registry_brand),
    path('registry_color', registry_color)
]