from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F
from .models import Tournament
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from rest_framework.views import APIView
from .serializers import (
    PublicTeamSerializer, PublicStageSerializer, PublicGroupSerializer, 
    PublicPlayerSerializer, PublicVenueSerializer, PublicStandingSerializer,
    PublicTournamentSerializer
)



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

from .models import (
    Tournament, Stage, Group, Team, Player, Venue,
    Referee, Match, MatchEvent, Standing
)
from .serializers import (
    TournamentSerializer, StageSerializer, GroupSerializer, TeamSerializer,
    PlayerSerializer, VenueSerializer, RefereeSerializer, MatchSerializer,
    MatchEventSerializer, StandingSerializer
)

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [IsAuthenticated]

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

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

class MatchEventViewSet(viewsets.ModelViewSet):
    queryset = MatchEvent.objects.all()
    serializer_class = MatchEventSerializer

class StandingViewSet(viewsets.ModelViewSet):
    queryset = Standing.objects.all()
    serializer_class = StandingSerializer


# ✅ Endpoint público para tabla de posiciones (ordenado por puntos y diferencia)
from rest_framework.views import APIView
class PublicStandingsView(APIView):
    def get(self, request, tournament_id):
        standings = Standing.objects.filter(tournament_id=tournament_id).order_by('-points', '-gd')
        serializer = StandingSerializer(standings, many=True)
        return Response(serializer.data)


# ✅ Endpoint público para calendario con eventos
class PublicScheduleView(APIView):
    def get(self, request, stage_id):
        matches = Match.objects.filter(team_home__group__stage_id=stage_id)
        data = []
        for match in matches:
            match_data = MatchSerializer(match).data
            events = MatchEvent.objects.filter(match=match)
            match_data['events'] = MatchEventSerializer(events, many=True).data
            data.append(match_data)
        return Response(data)


class PublicTeamsView(APIView):
    def get(self, request):
        teams = Team.objects.all()
        serializer = PublicTeamSerializer(teams, many=True)
        return Response(serializer.data)

class PublicStagesView(APIView):
    def get(self, request):
        stages = Stage.objects.all()
        serializer = PublicStageSerializer(stages, many=True)
        return Response(serializer.data)

class PublicGroupsView(APIView):
    def get(self, request):
        groups = Group.objects.all()
        serializer = PublicGroupSerializer(groups, many=True)
        return Response(serializer.data)

class PublicPlayersView(APIView):
    def get(self, request):
        players = Player.objects.all()
        serializer = PublicPlayerSerializer(players, many=True)
        return Response(serializer.data)

class PublicVenuesView(APIView):
    def get(self, request):
        venues = Venue.objects.all()
        serializer = PublicVenueSerializer(venues, many=True)
        return Response(serializer.data)

class PublicTournamentsListView(APIView):

    authentication_classes = []  # No authentication required for public view
    permission_classes = []  # No permissions required for public view

    def get(self, request):
        torneos = Tournament.objects.all()
        serializer = PublicTournamentSerializer(torneos, many=True)
        return Response(serializer.data)

class PublicStandingsView(APIView):
    def get(self, request, torneo_id):
        standings = Standing.objects.filter(tournament_id=torneo_id).order_by('-points', '-gd')
        serializer = PublicStandingSerializer(standings, many=True)
        return Response(serializer.data)

class PublicMatchesView(APIView):
    def get(self, request):
        matches = Match.objects.all()
        serializer = MatchSerializer(matches, many=True)
        return Response(serializer.data)