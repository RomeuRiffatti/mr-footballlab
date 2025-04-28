

# Verifica se as variáveis essenciais estão definidas
: "${SECRET_KEY:?SECRET_KEY não definida}"
: "${DATABASE_URL:?DATABASE_URL não definida}"
: "${PORT:?PORT não definida}"

echo "📁 Criando diretórios necessários..."
mkdir -p /app/media

echo "🌀 Coletando arquivos estáticos..."
python manage.py collectstatic --noinput

echo "🚀 Iniciando Gunicorn..."
gunicorn core.wsgi:application --bind 0.0.0.0:$PORT