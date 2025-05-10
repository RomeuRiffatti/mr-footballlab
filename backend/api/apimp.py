from .models import Order
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import  AllowAny
import mercadopago
import os
import logging
import hashlib
import hmac
import urllib.parse
logger = logging.getLogger(__name__)



@csrf_exempt    
@api_view(['POST'])
@permission_classes([AllowAny])
def get_webhook(request):
 

    # Obtain the x-signature value from the header
    xSignature = request.headers.get("x-signature")
    xRequestId = request.headers.get("x-request-id")
    if xSignature != "" and xRequestId != "":
        logger.debug(f"Signature = {xSignature}   xRequest = {xRequestId}",)  
        
    # Obtain Query params related to the request URL
    queryParams = urllib.parse.parse_qs(request.url.query)
    logger.debug(f"queryParams = {queryParams}")
    # Extract the "data.id" from the query params
    dataID = queryParams.get("data.id", [""])[0]
    logger.debug(f"dataID = {dataID}")
    # Separating the x-signature into parts
    parts = xSignature.split(",")
    logger.debug(f"Parts = {parts}")
    # Initializing variables to store ts and hash
    ts = None
    hash = None

    # Iterate over the values to obtain ts and v1
    for part in parts:
        # Split each part into key and value
        keyValue = part.split("=", 1)
        if len(keyValue) == 2:
            key = keyValue[0].strip()
            value = keyValue[1].strip()
            if key == "ts":
                ts = value
            elif key == "v1":
                hash = value

    # Obtain the secret key for the user/application from Mercadopago developers site
    secret = '833b83c35f6f2f2d132d796099917365ad59df51ca80da24ce1cda92c99d2dfa'

    # Generate the manifest string
    manifest = f"id:{dataID};request-id:{xRequestId};ts:{ts};"
    logger.debug(f"manifest = {manifest}")
    # Create an HMAC signature defining the hash type and the key as a byte array
    hmac_obj = hmac.new(secret.encode(), msg=manifest.encode(), digestmod=hashlib.sha256)
    logger.debug(f"hmac_obj = {hmac_obj}")
    # Obtain the hash result as a hexadecimal string
    sha = hmac_obj.hexdigest()
    logger.debug("sha = {sha}")
    if sha == hash:
        order = Order.objects.all().first()
        order.status = 'Feitoooooo'
        order.save()
        return (Response('Rota acessada com sucesso!', status=status.HTTP_200_OK)) ##funcionando
    else:
        return (Response('Não validado', status=status.HTTP_400_BAD_REQUEST)) ##funcionando  


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

