from .models import Order
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import  AllowAny
import mercadopago
import os




@api_view(['POST'])
@permission_classes([AllowAny])
def create_mercado_pago_preference(request):
    data = request.data
    boots = data.get('boots', [])
    
    #Validação dos dados
    for boot in boots:
        if boot['amount'] <= 0 or boot['product']['price'] <= 0:
            return Response({"error": "Dados inválidos"}, status=400)
   
    #Criar preferencia 
    sdk = mercadopago.SDK(os.getenv('MP_PRIVATE_KEY'))
    preference_data = {
        "items": [
            {
                "title": boot['product']['brand'],
                "quantity": boot['amount'],
                "unit_price": float(boot['product']['price']),
            }
            for boot in boots
        ],
         
        "back_urls": {
            "success": "https://mrfootballab.com.br/finish",
            "failure": "https://mrfootballab.com.br/finish",
            "pending": "https://mrfootballab.com.br/finish",
        },
        "auto_return": "approved",  
    }
    #Pegar resposta da preferência
    try:
        preference_response = sdk.preference().create(preference_data)
        
        
        if not isinstance(preference_response, dict) or 'response' not in preference_response:
            return Response(
                {"error": "Invalid response from Mercado Pago"},
                status=500
            )
        preference = preference_response['response']
       
        
        if 'id' not in preference:
            return Response(
            {"error": "Failed to create payment preference"},
            status=500
        )
        
        #Criando objeto Order para salvar dados do pedido e da preferência
        try:
            order = Order.objects.create(
                name=data.get('name'),
                last_name=data.get('last_name'),
                total_price=sum(boot['amount'] * boot['product']['price'] for boot in boots),
                status='PENDING',
                preference_id= preference['id']
            )
        except Exception as e:
            return Response({"error": str(e)}, status=400)
          
        return Response({
            "preference_id": preference['id'],
            "init_point": preference['init_point'],
            "sandbox_init_point": preference.get('sandbox_init_point', ''),
        })
        
    except Exception as e:
        order.delete()
        return Response(
            {"error": f"Error communicating with Mercado Pago: {str(e)}"},
            status=500
        )
        
api_view(['POST'])
@permission_classes([AllowAny])
def get_webhook(request):
    return (Response(status=201))