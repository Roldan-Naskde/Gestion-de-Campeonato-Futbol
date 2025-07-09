from .models import Team, Standing, Match

def calcular_tabla_posiciones(tournament_id):
    print(f"⚽ Calculando tabla para torneo ID: {tournament_id}")

    # Filtrar equipos por torneo (vía Stage y Group)
    equipos = Team.objects.filter(group__stage__tournament_id=tournament_id)
    print(f"Equipos encontrados: {equipos.count()}")

    # Limpiar tabla previa
    Standing.objects.filter(tournament_id=tournament_id).delete()

    posiciones = {}
    for equipo in equipos:
        posiciones[equipo.id] = {
            'team': equipo,
            'played': 0,
            'won': 0,
            'drawn': 0,
            'lost': 0,
            'gf': 0,
            'ga': 0,
            'points': 0,
        }

    partidos = Match.objects.filter(
        team_home__group__stage__tournament_id=tournament_id
    )

    print(f"Partidos encontrados: {partidos.count()}")

    for partido in partidos:
        home = partido.team_home_id
        away = partido.team_away_id
        home_score = partido.home_score
        away_score = partido.away_score

        if home_score is None or away_score is None:
            continue  # Ignorar partidos sin resultado

        posiciones[home]['played'] += 1
        posiciones[away]['played'] += 1

        posiciones[home]['gf'] += home_score
        posiciones[home]['ga'] += away_score

        posiciones[away]['gf'] += away_score
        posiciones[away]['ga'] += home_score

        if home_score > away_score:
            posiciones[home]['won'] += 1
            posiciones[home]['points'] += 3
            posiciones[away]['lost'] += 1
        elif away_score > home_score:
            posiciones[away]['won'] += 1
            posiciones[away]['points'] += 3
            posiciones[home]['lost'] += 1
        else:
            posiciones[home]['drawn'] += 1
            posiciones[away]['drawn'] += 1
            posiciones[home]['points'] += 1
            posiciones[away]['points'] += 1

    # Guardar posiciones
    for datos in posiciones.values():
        gd = datos['gf'] - datos['ga']
        Standing.objects.create(
            team=datos['team'],
            tournament_id=tournament_id,
            played=datos['played'],
            won=datos['won'],
            drawn=datos['drawn'],
            lost=datos['lost'],
            gf=datos['gf'],
            ga=datos['ga'],
            gd=gd,
            points=datos['points'],
        )
    print("✅ Tabla generada exitosamente.")