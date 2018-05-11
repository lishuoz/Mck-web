import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Player } from '../model/player';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PlayerService {
	 private playersUrl = environment.baseUrl+'/api/players';  // URL to web api

	 constructor(private http: HttpClient) { }

	 getPlayers (): Observable<Player[]> {
	 	return this.http.get<Player[]>(this.playersUrl);
	 }
	}
