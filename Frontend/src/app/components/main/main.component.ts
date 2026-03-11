import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { ApiService } from '../../services/api.service';
import { CountUpDirective } from '../../directives/count-up.directive';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    CountUpDirective
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  /* ── Data arrays ── */
  teams: any[] = [];
  drivers: any[] = [];
  circuits: any[] = [];
  races: any[] = [];
  results: any[] = [];

  /* ── Dashboard counts ── */
  teamCount = 0;
  driverCount = 0;
  circuitCount = 0;
  raceCount = 0;
  resultCount = 0;

  /* ── Championship ── */
  driverStandings: any[] = [];
  constructorStandings: any[] = [];

  /* ── Forms ── */
  teamForm!: FormGroup;
  driverForm!: FormGroup;
  circuitForm!: FormGroup;
  raceForm!: FormGroup;
  resultForm!: FormGroup;

  /* ── Edit IDs ── */
  editingTeamId: number | null = null;
  editingDriverId: number | null = null;
  editingCircuitId: number | null = null;
  editingRaceId: number | null = null;
  editingResultId: number | null = null;

  /* ── Table columns ── */
  teamColumns = ['index', 'name', 'base', 'principal', 'powerUnit', 'color', 'actions'];
  driverColumns = ['index', 'firstName', 'lastName', 'nationality', 'number', 'team', 'rookie', 'actions'];
  circuitColumns = ['index', 'name', 'country', 'city', 'lengthKm', 'lapRecord', 'actions'];
  raceColumns = ['index', 'round', 'grandPrix', 'date', 'status', 'circuit', 'actions'];
  resultColumns = ['index', 'race', 'driver', 'team', 'position', 'points', 'finishTime', 'fastestLap', 'actions'];
  driverStandingColumns = ['position', 'driver', 'team', 'points', 'wins', 'podiums'];
  constructorStandingColumns = ['position', 'team', 'points', 'wins', 'podiums'];

  raceStatuses = ['scheduled', 'finished', 'cancelled'];

  constructor(
    private api: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadAll();
  }

  /* ══════════════════════════════════════════
     INIT FORMS
     ══════════════════════════════════════════ */
  initForms(): void {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      base: ['', Validators.required],
      principal: ['', Validators.required],
      powerUnit: ['', Validators.required],
      color: ['', Validators.required]
    });

    this.driverForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required],
      number: [null, Validators.required],
      teamId: [null, Validators.required],
      rookie: [false]
    });

    this.circuitForm = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      lengthKm: [null, Validators.required],
      lapRecord: ['', Validators.required]
    });

    this.raceForm = this.fb.group({
      round: [null, Validators.required],
      grandPrix: ['', Validators.required],
      date: ['', Validators.required],
      status: ['scheduled', Validators.required],
      circuitId: [null, Validators.required]
    });

    this.resultForm = this.fb.group({
      raceId: [null, Validators.required],
      driverId: [null, Validators.required],
      teamId: [null, Validators.required],
      position: [null, Validators.required],
      points: [null, Validators.required],
      finishTime: ['', Validators.required],
      fastestLap: [false]
    });
  }

  /* ══════════════════════════════════════════
     LOAD ALL DATA
     ══════════════════════════════════════════ */
  loadAll(): void {
    forkJoin({
      teams: this.api.getTeams(),
      drivers: this.api.getDrivers(),
      circuits: this.api.getCircuits(),
      races: this.api.getRaces(),
      results: this.api.getResults()
    }).subscribe(data => {
      this.teams = data.teams;
      this.drivers = data.drivers;
      this.circuits = data.circuits;
      this.races = data.races;
      this.results = data.results;

      this.teamCount = this.teams.length;
      this.driverCount = this.drivers.length;
      this.circuitCount = this.circuits.length;
      this.raceCount = this.races.length;
      this.resultCount = this.results.length;

      this.calculateChampionship();
    });
  }

  /* ══════════════════════════════════════════
     CHAMPIONSHIP CALCULATION
     ══════════════════════════════════════════ */
  calculateChampionship(): void {
    // Driver standings
    const driverMap = new Map<number, { driver: any; team: any; points: number; wins: number; podiums: number }>();
    for (const r of this.results) {
      const did = r.driver?.id ?? r.driverId;
      if (!driverMap.has(did)) {
        driverMap.set(did, {
          driver: r.driver,
          team: r.team,
          points: 0, wins: 0, podiums: 0
        });
      }
      const entry = driverMap.get(did)!;
      entry.points += r.points;
      if (r.position === 1) entry.wins++;
      if (r.position <= 3) entry.podiums++;
    }
    this.driverStandings = Array.from(driverMap.values())
      .sort((a, b) => b.points - a.points || b.wins - a.wins);

    // Constructor standings
    const teamMap = new Map<number, { team: any; points: number; wins: number; podiums: number }>();
    for (const r of this.results) {
      const tid = r.team?.id ?? r.teamId;
      if (!teamMap.has(tid)) {
        teamMap.set(tid, {
          team: r.team,
          points: 0, wins: 0, podiums: 0
        });
      }
      const entry = teamMap.get(tid)!;
      entry.points += r.points;
      if (r.position === 1) entry.wins++;
      if (r.position <= 3) entry.podiums++;
    }
    this.constructorStandings = Array.from(teamMap.values())
      .sort((a, b) => b.points - a.points || b.wins - a.wins);
  }

  /* ══════════════════════════════════════════
     TEAM CRUD
     ══════════════════════════════════════════ */
  saveTeam(): void {
    if (this.teamForm.invalid) return;
    const data = this.teamForm.value;
    const op = this.editingTeamId
      ? this.api.updateTeam(this.editingTeamId, data)
      : this.api.createTeam(data);
    op.subscribe(() => {
      this.teamForm.reset();
      this.editingTeamId = null;
      this.loadAll();
    });
  }
  editTeam(t: any): void {
    this.editingTeamId = t.id;
    this.teamForm.patchValue(t);
  }
  deleteTeam(id: number): void {
    this.api.deleteTeam(id).subscribe(() => this.loadAll());
  }
  cancelTeamEdit(): void {
    this.editingTeamId = null;
    this.teamForm.reset();
  }

  /* ══════════════════════════════════════════
     DRIVER CRUD
     ══════════════════════════════════════════ */
  saveDriver(): void {
    if (this.driverForm.invalid) return;
    const data = this.driverForm.value;
    const op = this.editingDriverId
      ? this.api.updateDriver(this.editingDriverId, data)
      : this.api.createDriver(data);
    op.subscribe(() => {
      this.driverForm.reset();
      this.editingDriverId = null;
      this.loadAll();
    });
  }
  editDriver(d: any): void {
    this.editingDriverId = d.id;
    this.driverForm.patchValue({
      firstName: d.firstName,
      lastName: d.lastName,
      nationality: d.nationality,
      number: d.number,
      teamId: d.teamId ?? d.team?.id,
      rookie: d.rookie
    });
  }
  deleteDriver(id: number): void {
    this.api.deleteDriver(id).subscribe(() => this.loadAll());
  }
  cancelDriverEdit(): void {
    this.editingDriverId = null;
    this.driverForm.reset();
  }

  /* ══════════════════════════════════════════
     CIRCUIT CRUD
     ══════════════════════════════════════════ */
  saveCircuit(): void {
    if (this.circuitForm.invalid) return;
    const data = this.circuitForm.value;
    const op = this.editingCircuitId
      ? this.api.updateCircuit(this.editingCircuitId, data)
      : this.api.createCircuit(data);
    op.subscribe(() => {
      this.circuitForm.reset();
      this.editingCircuitId = null;
      this.loadAll();
    });
  }
  editCircuit(c: any): void {
    this.editingCircuitId = c.id;
    this.circuitForm.patchValue(c);
  }
  deleteCircuit(id: number): void {
    this.api.deleteCircuit(id).subscribe(() => this.loadAll());
  }
  cancelCircuitEdit(): void {
    this.editingCircuitId = null;
    this.circuitForm.reset();
  }

  /* ══════════════════════════════════════════
     RACE CRUD
     ══════════════════════════════════════════ */
  saveRace(): void {
    if (this.raceForm.invalid) return;
    const data = this.raceForm.value;
    const op = this.editingRaceId
      ? this.api.updateRace(this.editingRaceId, data)
      : this.api.createRace(data);
    op.subscribe(() => {
      this.raceForm.reset();
      this.editingRaceId = null;
      this.loadAll();
    });
  }
  editRace(r: any): void {
    this.editingRaceId = r.id;
    this.raceForm.patchValue({
      round: r.round,
      grandPrix: r.grandPrix,
      date: r.date ? r.date.substring(0, 10) : '',
      status: r.status,
      circuitId: r.circuitId ?? r.circuit?.id
    });
  }
  deleteRace(id: number): void {
    this.api.deleteRace(id).subscribe(() => this.loadAll());
  }
  cancelRaceEdit(): void {
    this.editingRaceId = null;
    this.raceForm.reset();
  }

  /* ══════════════════════════════════════════
     RESULT CRUD
     ══════════════════════════════════════════ */
  saveResult(): void {
    if (this.resultForm.invalid) return;
    const data = this.resultForm.value;
    const op = this.editingResultId
      ? this.api.updateResult(this.editingResultId, data)
      : this.api.createResult(data);
    op.subscribe(() => {
      this.resultForm.reset();
      this.editingResultId = null;
      this.loadAll();
    });
  }
  editResult(r: any): void {
    this.editingResultId = r.id;
    this.resultForm.patchValue({
      raceId: r.raceId ?? r.race?.id,
      driverId: r.driverId ?? r.driver?.id,
      teamId: r.teamId ?? r.team?.id,
      position: r.position,
      points: r.points,
      finishTime: r.finishTime,
      fastestLap: r.fastestLap
    });
  }
  deleteResult(id: number): void {
    this.api.deleteResult(id).subscribe(() => this.loadAll());
  }
  cancelResultEdit(): void {
    this.editingResultId = null;
    this.resultForm.reset();
  }
}
