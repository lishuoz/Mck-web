import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Level } from '../model/level';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LevelService {
	 
	 private levelsUrl = 'http://localhost:8000/api/levels';  // URL to web api

	 constructor(private http: HttpClient) { }

	 getLevels (): Observable<Level[]> {
	 	return this.http.get<Level[]>(this.levelsUrl);
	 }
}
