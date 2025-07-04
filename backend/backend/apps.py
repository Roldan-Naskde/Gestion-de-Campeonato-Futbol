from django.apps import AppConfig

class FulbitoConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'fulbito'

    def ready(self):
        import backend.signals  # Importa las señales
