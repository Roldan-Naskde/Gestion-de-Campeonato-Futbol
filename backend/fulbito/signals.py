from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Match
from .utils import calcular_tabla_posiciones

@receiver(post_save, sender=Match)
def actualizar_tabla_posiciones(sender, instance, **kwargs):
    torneo_id = instance.team_home.group.stage.tournament_id
    calcular_tabla_posiciones(torneo_id)
