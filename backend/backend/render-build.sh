#!/usr/bin/env bash
# Instalar dependencias
pip install -r requirements.txt

# Aplicar migraciones
python manage.py migrate

# (Opcional) Crear superusuario automáticamente si deseas
# python manage.py createsuperuser --noinput (solo si has predefinido un admin)

echo "Migraciones completadas ✅"

python manage.py collectstatic --noinput