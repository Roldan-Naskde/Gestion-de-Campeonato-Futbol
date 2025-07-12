from django.db import models

# ✅ Modelo: Campeonato (Tournament)
class Tournament(models.Model):
    name = models.CharField(max_length=100)
    season_year = models.PositiveIntegerField()
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.season_year})"


# ✅ Modelo: Fase (Stage)
class Stage(models.Model):
    name = models.CharField(max_length=50)
    order = models.PositiveIntegerField()
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='stages')

    def __str__(self):
        return f"{self.name} - {self.tournament}"


# ✅ Modelo: Grupo (Group)
class Group(models.Model):
    name = models.CharField(max_length=50)
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE, related_name='groups')

    def __str__(self):
        return f"{self.name} - {self.stage}"


# ✅ Modelo: Equipo (Team)
class Team(models.Model):
    name = models.CharField(max_length=100)
    coach_name = models.CharField(max_length=100)
    founded = models.IntegerField()
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True, related_name='teams')

    def __str__(self):
        return self.name


# ✅ Modelo: Jugador (Player)
class Player(models.Model):
    POSITION_CHOICES = [
        ('GK', 'Goalkeeper'),
        ('DEF', 'Defender'),
        ('MID', 'Midfielder'),
        ('FW', 'Forward'),
    ]
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth_date = models.DateField()
    position = models.CharField(max_length=3, choices=POSITION_CHOICES)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')

    class Meta:
        unique_together = ('first_name', 'last_name', 'team')

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.team.name}"


# ✅ Modelo: Sede (Venue)
class Venue(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=50)
    capacity = models.PositiveIntegerField()

    def __str__(self):
        return self.name


# ✅ Modelo: Árbitro (Referee)
class Referee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    category = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# ✅ Modelo: Partido (Match)
class Match(models.Model):
    datetime = models.DateTimeField()
    team_home = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches')
    team_away = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches')
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='matches')
    referee = models.ForeignKey(Referee, on_delete=models.SET_NULL, null=True, blank=True, related_name='matches')
    home_score = models.PositiveIntegerField(default=0)
    away_score = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.team_home} vs {self.team_away} - {self.datetime.strftime('%Y-%m-%d %H:%M')}"


# ✅ Modelo: Evento del Partido (MatchEvent)
class MatchEvent(models.Model):
    EVENT_CHOICES = [
        ('GOAL', 'Goal'),
        ('YELLOW', 'Yellow Card'),
        ('RED', 'Red Card'),
        ('FOUL', 'Foul'),
        ('SUB', 'Substitution'),
        ('PEN', 'Penalty'),
        ('OFFSIDE', 'Offside'),
        ('CORNER', 'Corner'),
        ('FREEKICK', 'Free Kick'),
    ]
    minute = models.PositiveIntegerField()
    event_type = models.CharField(max_length=10, choices=EVENT_CHOICES)
    description = models.TextField(blank=True)
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='events')
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='events')

    def __str__(self):
        return f"{self.event_type} - {self.player} ({self.minute}')"


# ✅ Modelo: Tabla de Posiciones (Standing)
class Standing(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, null=True, blank=True)
    played = models.PositiveIntegerField(default=0)  # Partidos jugados
    won = models.PositiveIntegerField(default=0)
    drawn = models.PositiveIntegerField(default=0)
    lost = models.PositiveIntegerField(default=0)
    gf = models.PositiveIntegerField(default=0)  # Goles a favor
    ga = models.PositiveIntegerField(default=0)  # Goles en contra
    gd = models.IntegerField(default=0)          # Diferencia de goles
    points = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('team', 'tournament')