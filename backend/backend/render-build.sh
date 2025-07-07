#!/usr/bin/env bash
# Instalar dependencias
pip install -r backend/requirements.txt

# Aplicar migraciones
python backend/manage.py migrate

# (Opcional) Crear superusuario automáticamente si deseas
# python backend/manage.py createsuperuser --noinput (solo si has predefinido un admin)

echo "Migraciones completadas ✅"
