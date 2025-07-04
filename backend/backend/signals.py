from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

channel_layer = get_channel_layer()
async_to_sync(channel_layer.group_send)(
    "partidos",
    {
        "type": "send_partido_evento",
        "data": {
            "minute": 23,
            "event_type": "GOAL",
            "player": "Jugador X",
            "description": "Gol de Jugador X",
        },
    }
)
