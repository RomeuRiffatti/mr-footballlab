from django.contrib import admin
from .models import Profile,Address,Brand,Color,NewsLetter,SoccerBoot,Line,BootInCart, Order, Question
# Register your models here.
admin.site.register(Profile)
admin.site.register(Address)
admin.site.register(Brand)
admin.site.register(Color)
admin.site.register(NewsLetter)
admin.site.register(SoccerBoot)
admin.site.register(Line)
admin.site.register(BootInCart)
admin.site.register(Question)


class BootInCartInline(admin.TabularInline):  # ou admin.StackedInline
    model = SoccerBoot
    extra = 0  # Não mostrar campos extras vazios
    readonly_fields = ['brand','line', 'color', 'bootie', 'price', 'rating', 'sold','boot_type', 'stock', 'image']
    can_delete = False  # Opcional: impedir exclusão pelo admin

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'last_name', 'total_price', 'date', 'status']
    inlines = [BootInCartInline]  # Adiciona a visualização inline
    readonly_fields = ['total_price']  # Se quiser que o preço seja somente leitura

    # Opcional: filtros e busca
    list_filter = ['name', 'last_name', 'status']
    search_fields = ['name', 'last_name', 'address__street', 'status']

    
    