from django.http import HttpResponse
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MyTokenObtainPairView
from .views import (
    TournamentViewSet, StageViewSet, GroupViewSet, TeamViewSet,
    PlayerViewSet, VenueViewSet, RefereeViewSet, MatchViewSet,
    MatchEventViewSet, StandingViewSet, PublicStandingsView, public_schedule,
    PublicTeamsView, PublicStagesView, PublicGroupsView, PublicPlayersView,
    PublicVenuesView, PublicTournamentsListView, PublicMatchesView,
    ResetAutoincrementAPIView, PublicRefereesView
)

def home(request):
    return HttpResponse("Backend de Fulbito funcionando.")
router = DefaultRouter()
router.register(r'tournaments', TournamentViewSet)
router.register(r'stages', StageViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'venues', VenueViewSet)
router.register(r'referees', RefereeViewSet)
router.register(r'matches', MatchViewSet)
router.register(r'match-events', MatchEventViewSet)
router.register(r'standings', StandingViewSet)

urlpatterns = [
    path('', home),

    path('api/', include(router.urls)),

    # Token JWT
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    # Endpoints públicos existentes
    path('api/public/standings/<int:torneo_id>/', PublicStandingsView.as_view(), name='public-standings'),
    path('api/public/schedule/<int:stage_id>/', public_schedule, name='public-schedule'),

    # ✅ Nuevos endpoints públicos (los que faltaban)
    path('api/public/matches/', PublicMatchesView.as_view(), name='public-matches'),
    # Endpoint protegido para resetear autoincrement de IDs (solo admin)
    path('api/admin/reset-autoincrement/', ResetAutoincrementAPIView.as_view(), name='reset-autoincrement'),
    path('api/public/teams/', PublicTeamsView.as_view(), name='public-teams'),
    path('api/public/stages/', PublicStagesView.as_view(), name='public-stages'),
    path('api/public/groups/', PublicGroupsView.as_view(), name='public-groups'),
    path('api/public/players/', PublicPlayersView.as_view(), name='public-players'),
    path('api/public/venues/', PublicVenuesView.as_view(), name='public-venues'),
    path('api/public/referees/', PublicRefereesView.as_view(), name='public-referees'),
    path('api/public/tournaments/', PublicTournamentsListView.as_view(), name='public-tournaments'),
]
