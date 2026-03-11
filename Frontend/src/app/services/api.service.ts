import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE = 'http://localhost:4444/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  /* ── Dashboard ── */
  getDashboard(): Observable<any> {
    return this.http.get(`${BASE}/dashboard`);
  }

  /* ── Teams ── */
  getTeams(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE}/teams`);
  }
  createTeam(data: any): Observable<any> {
    return this.http.post(`${BASE}/teams`, data);
  }
  updateTeam(id: number, data: any): Observable<any> {
    return this.http.put(`${BASE}/teams/${id}`, data);
  }
  deleteTeam(id: number): Observable<any> {
    return this.http.delete(`${BASE}/teams/${id}`);
  }

  /* ── Drivers ── */
  getDrivers(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE}/drivers`);
  }
  createDriver(data: any): Observable<any> {
    return this.http.post(`${BASE}/drivers`, data);
  }
  updateDriver(id: number, data: any): Observable<any> {
    return this.http.put(`${BASE}/drivers/${id}`, data);
  }
  deleteDriver(id: number): Observable<any> {
    return this.http.delete(`${BASE}/drivers/${id}`);
  }

  /* ── Circuits ── */
  getCircuits(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE}/circuits`);
  }
  createCircuit(data: any): Observable<any> {
    return this.http.post(`${BASE}/circuits`, data);
  }
  updateCircuit(id: number, data: any): Observable<any> {
    return this.http.put(`${BASE}/circuits/${id}`, data);
  }
  deleteCircuit(id: number): Observable<any> {
    return this.http.delete(`${BASE}/circuits/${id}`);
  }

  /* ── Races ── */
  getRaces(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE}/races`);
  }
  createRace(data: any): Observable<any> {
    return this.http.post(`${BASE}/races`, data);
  }
  updateRace(id: number, data: any): Observable<any> {
    return this.http.put(`${BASE}/races/${id}`, data);
  }
  deleteRace(id: number): Observable<any> {
    return this.http.delete(`${BASE}/races/${id}`);
  }

  /* ── Results ── */
  getResults(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE}/results`);
  }
  createResult(data: any): Observable<any> {
    return this.http.post(`${BASE}/results`, data);
  }
  updateResult(id: number, data: any): Observable<any> {
    return this.http.put(`${BASE}/results/${id}`, data);
  }
  deleteResult(id: number): Observable<any> {
    return this.http.delete(`${BASE}/results/${id}`);
  }
}
