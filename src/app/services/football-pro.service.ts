import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FootballProService {

  private apiUrl = 'https://v3.football.api-sports.io/';
  private headers = new HttpHeaders({
    'x-apisports-key': 'd991eb9ef2a31adcaa0e1f15236daa2d'
  });

  constructor(private http: HttpClient) {}

  // Obtener standings (tabla)
  getStandings(league: number, season: number) {
    return this.http.get(`${this.apiUrl}standings?league=${league}&season=${season}`, {
      headers: this.headers
    });
  }

  // Obtener goleadores
  getTopScorers(league: number, season: number) {
    return this.http.get(`${this.apiUrl}players/topscorers?league=${league}&season=${season}`, {
      headers: this.headers
    });
  }

  // Fixtures futuros o pasados
  getFixtures(league: number, season: number, next?: number, last?: number) {
    let url = `${this.apiUrl}fixtures?league=${league}&season=${season}`;
    if (next) url += `&next=${next}`;
    if (last) url += `&last=${last}`;
    return this.http.get(url, { headers: this.headers });
  }

  // Equipos
  getTeams(league: number, season: number) {
    return this.http.get(`${this.apiUrl}teams?league=${league}&season=${season}`, {
      headers: this.headers
    });
  }

  // Info liga
  getLeagueInfo(league: number) {
    return this.http.get(`${this.apiUrl}leagues?id=${league}`, {
      headers: this.headers
    });
  }
}
