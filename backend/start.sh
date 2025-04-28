#!/bin/bash

echo "⏳ Rodando collectstatic..."
python manage.py collectstatic --noinput

# Garantindo que o diretório de mídia exista
mkdir -p /app/media

echo "🚀 Iniciando o Gunicorn..."
gunicorn core.wsgi --bind 0.0.0.0:$PORT