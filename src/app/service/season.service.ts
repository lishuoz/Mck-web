import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Season } from '../model/season';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SeasonService {
	private seasonsUrl = 'http://localhost:8000/api/seasons';  // URL to web api

	 constructor(private http: HttpClient) { }
	getSeasons (): Observable<Season[]> {
		return this.http.get<Season[]>(this.seasonsUrl);
	}
}
