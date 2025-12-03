import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballProService } from '../../services/football-pro.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  standings: any[] = [];
  topScorers: any[] = [];
  nextFixtures: any[] = [];
  lastResults: any[] = [];
  teams: any[] = [];
  leagueInfo: any = {};

  // SOLO LIGAS DEL PLAN GRATIS
  leagues = [
    { id: 39, name: "Premier League (Inglaterra)" },
    { id: 140, name: "LaLiga (España)" },
    { id: 135, name: "Serie A (Italia)" },
    { id: 78, name: "Bundesliga (Alemania)" },
    { id: 61, name: "Ligue 1 (Francia)" },
    { id: 94, name: "Primeira Liga (Portugal)" },
    { id: 128, name: "Liga MX (México)" },
    { id: 262, name: "MLS (USA)" }
  ];

  season = 2023;
  leagueId = 39; // por defecto Premier League

  constructor(private api: FootballProService) {}

  ngOnInit(): void {
    this.loadData();
  }

  onLeagueChange(event: any) {
    this.leagueId = Number(event.target.value);
    this.loadData();
  }

  // Carga todos los datos de la liga seleccionada
  loadData() {

    this.api.getStandings(this.leagueId, this.season).subscribe((res: any) => {
      this.standings = res?.response?.[0]?.league?.standings?.[0] || [];
      this.leagueInfo = res?.response?.[0]?.league || {};
    });

    this.api.getTopScorers(this.leagueId, this.season).subscribe((res: any) => {
      this.topScorers = res?.response || [];
    });

    this.api.getFixtures(this.leagueId, this.season, 5).subscribe((res: any) => {
      this.nextFixtures = res?.response || [];
    });

    this.api.getFixtures(this.leagueId, this.season, undefined, 5).subscribe((res: any) => {
      this.lastResults = res?.response || [];
    });

    this.api.getTeams(this.leagueId, this.season).subscribe((res: any) => {
      this.teams = res?.response || [];
    });
  }
}
