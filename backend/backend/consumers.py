import json
from channels.generic.websocket import AsyncWebsocketConsumer

class PartidoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("partidos", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("partidos", self.channel_name)

    async def receive(self, text_data):
        # Aquí normalmente no recibes, solo envías desde backend.
        pass

    async def send_partido_evento(self, event):
        await self.send(text_data=json.dumps(event['data']))
