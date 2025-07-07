import json
from channels.generic.websocket import AsyncWebsocketConsumer

class TournamentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("tournaments", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("tournaments", self.channel_name)

    async def receive(self, text_data):
        # No se espera recibir mensajes del cliente, solo enviar desde el backend
        pass

    async def tournament_update(self, event):
        # Enviar mensaje a los clientes WebSocket
        await self.send(text_data=json.dumps(event["data"]))
