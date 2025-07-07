from django.urls import re_path
from fulbito.consumers import TournamentConsumer

websocket_urlpatterns = [
    re_path(r'ws/tournaments/$', TournamentConsumer.as_asgi()),
]