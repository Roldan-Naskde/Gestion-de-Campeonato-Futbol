from django.contrib import admin
from fulbito.views import generar_tabla_posiciones
from django.urls import path, include
from django.core.management import call_command
from django.http import HttpResponse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# 🚨 Ruta temporal para migrar la base de datos
def run_migrations(request):
    call_command('migrate')
    return HttpResponse("✅ Migraciones ejecutadas correctamente.")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('fulbito.urls')),  # Rutas de la App principal
    # JWT endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('generar-tabla-posiciones/<int:tournament_id>/', generar_tabla_posiciones, name='generar-tabla-posiciones'),
    path('migrate/', run_migrations),  # Ruta temporal para correr migraciones
]
