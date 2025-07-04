from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (
    Tournament, Stage, Group, Team, Player, Venue,
    Referee, Match, MatchEvent, Standing
)

# 🔐 JWT personalizado
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        return token

# ✅ Serializers Admin (CRUD + mostrar nombres)
class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = '__all__'


class StageSerializer(serializers.ModelSerializer):
    tournament_name = serializers.CharField(source='tournament.name', read_only=True)
    tournament = serializers.PrimaryKeyRelatedField(queryset=Tournament.objects.all())
    tournament_season = serializers.IntegerField(source='tournament.season_year', read_only=True)


    class Meta:
        model = Stage
        fields = ['id', 'name', 'order', 'tournament', 'tournament_name', 'tournament_season']



class GroupSerializer(serializers.ModelSerializer):
    stage_name = serializers.CharField(source='stage.name', read_only=True)
    stage = serializers.PrimaryKeyRelatedField(queryset=Stage.objects.all())

    class Meta:
        model = Group
        fields = ['id', 'name', 'stage', 'stage_name']


class TeamSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)
    group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all())

    class Meta:
        model = Team
        fields = ['id', 'name', 'coach_name', 'founded', 'group', 'group_name']


class PlayerSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())

    class Meta:
        model = Player
        fields = [
            'id', 'first_name', 'last_name', 'birth_date',
            'position', 'team', 'team_name'
        ]


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = '__all__'


class RefereeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Referee
        fields = '__all__'


class MatchEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchEvent
        fields = '__all__'


class StandingSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)
    tournament_name = serializers.CharField(source='tournament.name', read_only=True)
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())
    tournament = serializers.PrimaryKeyRelatedField(queryset=Tournament.objects.all())

    class Meta:
        model = Standing
        fields = [
            'id', 'team', 'team_name', 'tournament', 'tournament_name',
            'played', 'won', 'drawn', 'lost', 'gf', 'ga', 'gd', 'points'
        ]


class MatchSerializer(serializers.ModelSerializer):
    team_home_name = serializers.CharField(source='team_home.name', read_only=True)
    team_away_name = serializers.CharField(source='team_away.name', read_only=True)
    venue_name = serializers.CharField(source='venue.name', read_only=True)
    referee_name = serializers.SerializerMethodField()

    def get_referee_name(self, obj):
        if obj.referee:
            return f"{obj.referee.first_name} {obj.referee.last_name}"
        return None

    class Meta:
        model = Match
        fields = [
            'id', 'datetime', 'team_home', 'team_away',
            'venue', 'referee', 'home_score', 'away_score',
            'team_home_name', 'team_away_name', 'venue_name', 'referee_name',
        ]

# ✅ Serializers Públicos (Solo lectura, sin ID de relaciones)
class PublicTournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ['id', 'name']


class PublicStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ['id', 'name', 'order']


class PublicGroupSerializer(serializers.ModelSerializer):
    stage_name = serializers.CharField(source='stage.name', read_only=True)

    class Meta:
        model = Group
        fields = ['id', 'name', 'stage_name']


class PublicTeamSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'coach_name', 'founded', 'group_name']


class PublicPlayerSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)

    class Meta:
        model = Player
        fields = ['id', 'first_name', 'last_name', 'position', 'team_name']


class PublicVenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ['id', 'name', 'address', 'city', 'capacity']


class PublicStandingSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)

    class Meta:
        model = Standing
        fields = ['team_name', 'played', 'won', 'drawn', 'lost', 'gf', 'ga', 'gd', 'points']


class PublicMatchSerializer(serializers.ModelSerializer):
    team_home_name = serializers.CharField(source='team_home.name', read_only=True)
    team_away_name = serializers.CharField(source='team_away.name', read_only=True)
    venue_name = serializers.CharField(source='venue.name', read_only=True)

    class Meta:
        model = Match
        fields = [
            'id', 'datetime', 'team_home', 'team_away',
            'venue', 'referee', 'home_score', 'away_score',
            'team_home_name', 'team_away_name', 'venue_name'
        ]
