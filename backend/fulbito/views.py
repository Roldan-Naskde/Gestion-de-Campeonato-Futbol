from django.db import connection
from django.db.models import F
from rest_framework import viewsets
from rest_framework.decorators import api_view, action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import (
    Tournament, Stage, Group, Team, Player, Venue,
    Referee, Match, MatchEvent, Standing
)
from .serializers import (
    TournamentSerializer, StageSerializer, GroupSerializer, TeamSerializer,
    PlayerSerializer, VenueSerializer, RefereeSerializer, MatchSerializer,
    MatchEventSerializer, StandingSerializer, MyTokenObtainPairSerializer,
    PublicTeamSerializer, PublicStageSerializer, PublicGroupSerializer,
    PublicPlayerSerializer, PublicVenueSerializer, PublicStandingSerializer,
    PublicTournamentSerializer
)
from .services import actualizar_tabla_posiciones
from .utils import calcular_tabla_posiciones

# JWT Token View
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# CRUD ViewSets
class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class StageViewSet(viewsets.ModelViewSet):
    queryset = Stage.objects.all()
    serializer_class = StageSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class VenueViewSet(viewsets.ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

class RefereeViewSet(viewsets.ModelViewSet):
    queryset = Referee.objects.all()
    serializer_class = RefereeSerializer

class MatchEventViewSet(viewsets.ModelViewSet):
    queryset = MatchEvent.objects.all()
    serializer_class = MatchEventSerializer

class StandingViewSet(viewsets.ModelViewSet):
    queryset = Standing.objects.all()
    serializer_class = StandingSerializer

# Match con actualización automática de tabla
class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

    def perform_create(self, serializer):
        match = serializer.save()
        # Recalcula automáticamente al crear
        torneo_id = match.team_home.group.stage.tournament_id
        calcular_tabla_posiciones(torneo_id)

    def perform_update(self, serializer):
        match = serializer.save()
        # Recalcula automáticamente al actualizar
        torneo_id = match.team_home.group.stage.tournament_id
        calcular_tabla_posiciones(torneo_id)

# Reset Autoincrement (Solo Admin)
class ResetAutoincrementAPIView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        tables = [
            'fulbito_tournament', 'fulbito_stage', 'fulbito_group', 'fulbito_team',
            'fulbito_player', 'fulbito_venue', 'fulbito_referee', 'fulbito_match',
            'fulbito_matchevent', 'fulbito_standing'
        ]
        with connection.cursor() as cursor:
            for table in tables:
                cursor.execute(f"DELETE FROM sqlite_sequence WHERE name='{table}'")
        return Response({'status': 'Autoincrement reseteado'})

# Generar Tabla de Posiciones Manualmente
@api_view(['POST'])
def generar_tabla_posiciones(request, tournament_id):
    calcular_tabla_posiciones(tournament_id)
    return Response({'status': 'Tabla de posiciones generada correctamente.'})

# APIs Públicas (sin autenticación)
class PublicTeamsView(APIView):
    def get(self, request):
        teams = Team.objects.all()
        data = PublicTeamSerializer(teams, many=True).data
        for idx, item in enumerate(data, 1):
            item['numero'] = idx
        return Response(data)

class PublicStagesView(APIView):
    def get(self, request):
        stages = Stage.objects.all()
        data = PublicStageSerializer(stages, many=True).data
        for idx, item in enumerate(data, 1):
            item['numero'] = idx
        return Response(data)

class PublicGroupsView(APIView):
    def get(self, request):
        groups = Group.objects.all()
        data = PublicGroupSerializer(groups, many=True).data
        for idx, item in enumerate(data, 1):
            item['numero'] = idx
        return Response(data)

class PublicPlayersView(APIView):
    def get(self, request):
        players = Player.objects.all()
        data = PublicPlayerSerializer(players, many=True).data
        for idx, item in enumerate(data, 1):
            item['numero'] = idx
        return Response(data)

class PublicVenuesView(APIView):
    def get(self, request):
        venues = Venue.objects.all()
        data = PublicVenueSerializer(venues, many=True).data
        for idx, item in enumerate(data, 1):
            item['numero'] = idx
        return Response(data)

class PublicTournamentsListView(APIView):
    def get(self, request):
        tournaments = Tournament.objects.all()
        data = PublicTournamentSerializer(tournaments, many=True).data
        for idx, item in enumerate(data, 1):
            item['numero'] = idx
        return Response(data)

class PublicStandingsView(APIView):
    def get(self, request, torneo_id):
        standings = Standing.objects.filter(tournament_id=torneo_id).order_by('-points', '-gd')
        data = PublicStandingSerializer(standings, many=True).data
        for idx, item in enumerate(data, 1):
            item['numero'] = idx
        return Response(data)

class PublicMatchesView(APIView):
    def get(self, request):
        matches = Match.objects.all()
        data = MatchSerializer(matches, many=True).data
        for idx, item in enumerate(data, 1):
            item['numero'] = idx
        return Response(data)

class PublicRefereesView(APIView):
    def get(self, request):
        referees = Referee.objects.all()
        data = RefereeSerializer(referees, many=True).data
        for idx, item in enumerate(data, 1):
            item['numero'] = idx
        return Response(data)

# Público - Calendario con eventos
@api_view(['GET'])
def public_schedule(request, stage_id):
    matches = Match.objects.filter(team_home__group__stage_id=stage_id)
    result = []
    for match in matches:
        events = MatchEvent.objects.filter(match=match)
        result.append({
            'match': {
                'id': match.id,
                'datetime': match.datetime,
                'home_team': match.team_home.name,
                'away_team': match.team_away.name,
                'home_score': match.home_score,
                'away_score': match.away_score,
                'venue': match.venue.name
            },
            'events': MatchEventSerializer(events, many=True).data
        })
    return Response(result)

# views.py
@api_view(['GET'])
def public_standings(request, tournament_id):
    standings = Standing.objects.filter(
        tournament_id=tournament_id
    ).order_by('group__name', '-points', '-gd')

    serializer = StandingSerializer(standings, many=True)
    return Response(serializer.data)
