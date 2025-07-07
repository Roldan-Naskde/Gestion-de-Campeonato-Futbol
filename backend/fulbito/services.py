from .models import Match, Standing, Team, Tournament

def actualizar_tabla_posiciones(tournament_id):
    # Primero eliminamos la tabla de posiciones actual para recalcular todo
    Standing.objects.filter(tournament_id=tournament_id).delete()

    equipos = Team.objects.all()
    for equipo in equipos:
        partidos_jugados = Match.objects.filter(
            tournament_id=tournament_id
        ).filter(team_home=equipo) | Match.objects.filter(
            tournament_id=tournament_id
        ).filter(team_away=equipo)

        jugados = partidos_jugados.count()
        ganados = 0
        empatados = 0
        perdidos = 0
        goles_favor = 0
        goles_contra = 0

        for partido in partidos_jugados:
            if partido.team_home == equipo:
                goles_favor += partido.home_score
                goles_contra += partido.away_score
                if partido.home_score > partido.away_score:
                    ganados += 1
                elif partido.home_score == partido.away_score:
                    empatados += 1
                else:
                    perdidos += 1
            elif partido.team_away == equipo:
                goles_favor += partido.away_score
                goles_contra += partido.home_score
                if partido.away_score > partido.home_score:
                    ganados += 1
                elif partido.away_score == partido.home_score:
                    empatados += 1
                else:
                    perdidos += 1

        if jugados > 0:
            Standing.objects.create(
                team=equipo,
                tournament_id=tournament_id,
                played=jugados,
                won=ganados,
                drawn=empatados,
                lost=perdidos,
                gf=goles_favor,
                ga=goles_contra,
                gd=goles_favor - goles_contra,
                points=ganados * 3 + empatados,
            )
