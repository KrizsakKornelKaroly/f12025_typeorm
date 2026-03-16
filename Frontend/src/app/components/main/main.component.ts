import { Component, OnInit } from '@angular/core';
import { CountUpDirective } from '../../directives/count-up.directive';

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
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCardModule, CountUpDirective, MatTabsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatTableModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  constructor(private api: ApiService) { }

  //Statisztika változók

  teamCount: number = 0;
  driverCount: number = 0;
  circuitCount: number = 0;
  raceCount: number = 0;
  resultCount: number = 0;

  // Táblázat változói
  teams: any[] = [];
  teamForm!: FormGroup;
  teamColumns = ['index', 'name', 'base', 'principal', 'powerUnit', 'color', 'actions'];
  editingTeamId: number | null = null;

  drivers: any[] = [];
  driverForm!: FormGroup;
  driverColumns = ['index', 'firstName', 'lastName', 'nationality', 'number', 'team', 'rookie', 'actions'];
  editingDriverId: number | null = null;

  circuits: any[] = [];
  circuitForm!: FormGroup;
  circuitColumns = ['index', 'name', 'country', 'city', 'lengthKm', 'lapRecord', 'actions'];
  editingCircuitId: number | null = null;

  races: any[] = [];
  raceForm!: FormGroup;
  raceColumns = ['index', 'round', 'grandPrix', 'circuit', 'date', 'status', 'actions'];
  editingRaceId: number | null = null;
  raceStatuses = ['scheduled', 'finished', 'cancelled'];

  results: any[] = [];
  resultForm!: FormGroup;
  resultColumns = ['index', 'race', 'driver', 'team', 'position', 'points', 'finishTime', 'fastestLap', 'actions'];
  editingResultId: number | null = null;


  driverStandings: any[] = [];
  constructorStandings: any[] = [];
  driverStandingColumns = ['position', 'driver', 'team', 'points', 'wins', 'podiums'];
  constructorStandingColumns = ['position', 'team', 'points', 'wins', 'podiums'];


  ngOnInit() {
    this.getStats();
    this.getAllData();
  }

  getStats() {
    this.api.getStats().subscribe((res: any) => {
      if (res) {
        this.teamCount = Number(res.data.teams);
        this.driverCount = Number(res.data.drivers);
        this.circuitCount = Number(res.data.circuits);
        this.raceCount = Number(res.data.races);
        this.resultCount = Number(res.data.raceResults);
      }
    });
  }

  getAllData() {
    this.api.getTeams().subscribe((res: any) => {
      this.teams = res;
    });
    this.api.getDrivers().subscribe((res: any) => {
      this.drivers = res;
    });
    this.api.getCircuits().subscribe((res: any) => {
      this.circuits = res;
    });
    this.api.getRaces().subscribe((res: any) => {
      this.races = res;
    });
    this.api.getResults().subscribe((res: any) => {
      this.results = res;
      this.calculateChampionship();
    });

    this.initForms();
  }

  initForms() {
    this.teamForm = new FormGroup({
      name: new FormControl('', Validators.required),
      base: new FormControl('', Validators.required),
      principal: new FormControl('', Validators.required),
      powerUnit: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
    });

    this.driverForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      teamId: new FormControl('', Validators.required),
      rookie: new FormControl(false)
    });

    this.circuitForm = new FormGroup({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      lengthKm: new FormControl('', Validators.required),
      lapRecord: new FormControl('', Validators.required),
    });

    this.raceForm = new FormGroup({
      round: new FormControl('', Validators.required),
      grandPrix: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      circuitId: new FormControl('', Validators.required),
    });

    this.resultForm = new FormGroup({
      raceId: new FormControl('', Validators.required),
      driverId: new FormControl('', Validators.required),
      teamId: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      points: new FormControl('', Validators.required),
      finishTime: new FormControl('', Validators.required),
      fastestLap: new FormControl('', Validators.required),
    });
  }


  //Ezt a pajtás intézte last minute
  calculateChampionship() {
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

  //Csapatműveletek
  saveTeam() {
    if (this.teamForm.invalid) return;
    const teamData = this.teamForm.value;
    const formMode = this.editingTeamId ? this.api.updateTeam(this.editingTeamId, teamData) : this.api.createTeam(teamData);
    formMode.subscribe((res: any) => {
      this.teamForm.reset();
      this.editingTeamId = null;
      this.getAllData();
    });
  }

  editTeam(team: any) {
    this.editingTeamId = team.id;
    this.teamForm.patchValue({
      name: team.name,
      base: team.base,
      principal: team.principal,
      powerUnit: team.powerUnit,
      color: team.color
    });
  }

  cancelTeamEdit() {
    this.editingTeamId = null;
    this.teamForm.reset();
  }

  deleteTeam(id: number) {
    this.api.deleteTeam(id).subscribe(() => {
      this.getAllData();
    });
  }

  //Pilótaműveletek

  saveDriver() {
    if (this.driverForm.invalid) return;
    const driverData = this.driverForm.value;
    const formMode = this.editingDriverId ? this.api.updateDriver(this.editingDriverId, driverData) : this.api.createDriver(driverData);
    formMode.subscribe((res: any) => {
      this.driverForm.reset();
      this.editingDriverId = null;
      this.getAllData();
    });
  }

  editDriver(driver: any) {
    this.editingDriverId = driver.id;
    this.driverForm.patchValue({
      firstName: driver.firstName,
      lastName: driver.lastName,
      nationality: driver.nationality,
      number: driver.number,
      teamId: driver.teamId,
      rookie: driver.rookie
    });
  }

  cancelDriverEdit() {
    this.editingDriverId = null;
    this.driverForm.reset();
  }

  deleteDriver(id: number) {
    this.api.deleteDriver(id).subscribe(() => {
      this.getAllData();
    });
  }

  //Pályaműveletek

  saveCircuit() {
    if (this.circuitForm.invalid) return;
    const circuitData = this.circuitForm.value;
    const formMode = this.editingCircuitId ? this.api.updateCircuit(this.editingCircuitId, circuitData) : this.api.createCircuit(circuitData);
    formMode.subscribe((res: any) => {
      this.circuitForm.reset();
      this.editingCircuitId = null;
      this.getAllData();
    });
  }

  editCircuit(circuit: any) {
    this.editingCircuitId = circuit.id;
    this.circuitForm.patchValue({
      name: circuit.name,
      country: circuit.country,
      city: circuit.city,
      lengthKm: circuit.lengthKm,
      lapRecord: circuit.lapRecord
    });
  }

  cancelCircuitEdit() {
    this.editingCircuitId = null;
    this.circuitForm.reset();
  }

  deleteCircuit(id: number) {
    this.api.deleteCircuit(id).subscribe(() => {
      this.getAllData();
    });
  }

  //Versenyműveletek

  saveRace() {
    if (this.raceForm.invalid) return;
    const raceData = this.raceForm.value;
    const formMode = this.editingRaceId ? this.api.updateRace(this.editingRaceId, raceData) : this.api.createRace(raceData);
    formMode.subscribe((res: any) => {
      this.raceForm.reset();
      this.editingRaceId = null;
      this.getAllData();
    });
  }

  editRace(race: any) {
    this.editingRaceId = race.id;
    this.raceForm.patchValue({
      name: race.name,
      circuitId: race.circuitId,
      date: race.date,
      status: race.status
    });
  }

  cancelRaceEdit() {
    this.editingRaceId = null;
    this.raceForm.reset();
  }

  deleteRace(id: number) {
    this.api.deleteRace(id).subscribe(() => {
      this.getAllData();
    });
  }

  //Eredményműveletek

  saveResult() {
    if (this.resultForm.invalid) return;
    const resultData = this.resultForm.value;
    const formMode = this.editingResultId ? this.api.updateResult(this.editingResultId, resultData) : this.api.createResult(resultData);
    formMode.subscribe((res: any) => {
      this.resultForm.reset();
      this.editingResultId = null;
      this.getAllData();
    });
  }

  editResult(result: any) {
    this.editingResultId = result.id;
    this.resultForm.patchValue({
      raceId: result.raceId,
      driverId: result.driverId,
      position: result.position,
      points: result.points
    });
  }

  cancelResultEdit() {
    this.editingResultId = null;
    this.resultForm.reset();
  }

  deleteResult(id: number) {
    this.api.deleteResult(id).subscribe(() => {
      this.getAllData();
    });
  }

}
