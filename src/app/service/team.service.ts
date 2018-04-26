import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Team } from '../model/team';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TeamService {
	 private teamsUrl = 'http://localhost:8000/api/teams';  // URL to web api

	 constructor(private http: HttpClient) { }

	 getTeams (): Observable<Team[]> {
	 	return this.http.get<Team[]>(this.teamsUrl);
	 }
	}
