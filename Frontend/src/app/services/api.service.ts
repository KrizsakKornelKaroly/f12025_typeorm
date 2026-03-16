import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const server = 'http://localhost:4444/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  //Dashboard
  getDashboard(){
    return this.http.get(`${server}/dashboard`);
  }

  //Teams
  getTeams() {
    return this.http.get(`${server}/teams`);
  }
  createTeam(data: any)    {
    return this.http.post(`${server}/teams`, data);
  }
  updateTeam(id: number, data: any) {
    return this.http.put(`${server}/teams/${id}`, data);
  }
  deleteTeam(id: number) {
    return this.http.delete(`${server}/teams/${id}`);
  }

  //Drivers
  getDrivers() {
    return this.http.get(`${server}/drivers`);
  }
  createDriver(data: any) {
    return this.http.post(`${server}/drivers`, data);
  }
  updateDriver(id: number, data: any) {
    return this.http.put(`${server}/drivers/${id}`, data);
  }
  deleteDriver(id: number) {
    return this.http.delete(`${server}/drivers/${id}`);
  }

  //Circuits
  getCircuits() {
    return this.http.get(`${server}/circuits`);
  }
  createCircuit(data: any) {
    return this.http.post(`${server}/circuits`, data);
  }
  updateCircuit(id: number, data: any) {
    return this.http.put(`${server}/circuits/${id}`, data);
  }
  deleteCircuit(id: number) {
    return this.http.delete(`${server}/circuits/${id}`);
  }

  //Races
  getRaces() {
    return this.http.get(`${server}/races`);
  }
  createRace(data: any) {
    return this.http.post(`${server}/races`, data);
  }
  updateRace(id: number, data: any) {
    return this.http.put(`${server}/races/${id}`, data);
  }
  deleteRace(id: number) {
    return this.http.delete(`${server}/races/${id}`);
  }

  //Results
  getResults() {
    return this.http.get(`${server}/results`);
  }
  createResult(data: any) {
    return this.http.post(`${server}/results`, data);
  }
  updateResult(id: number, data: any) {
    return this.http.put(`${server}/results/${id}`, data);
  }
  deleteResult(id: number) {
    return this.http.delete(`${server}/results/${id}`);
  }

  /* ── Stats ── */
  getStats() {
    return this.http.get(`${server}/dashboard`);
  }
}