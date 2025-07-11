from django.contrib import admin
from .models import Tournament, Stage, Group, Team, Player, Venue, Match, MatchEvent, Referee, Standing

admin.site.register(Tournament)
admin.site.register(Stage)
admin.site.register(Group)
admin.site.register(Team)
admin.site.register(Player)
admin.site.register(Venue)
admin.site.register(MatchEvent)
admin.site.register(Referee)
admin.site.register(Standing)

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('team_home', 'team_away', 'datetime')
    list_filter = ('venue', 'datetime')
    search_fields = ('team_home__name', 'team_away__name')
