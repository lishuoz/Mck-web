import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Edition } from '../model/edition';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EditionService {
	 
	 private editionsUrl = 'http://localhost:8000/api/editions';  // URL to web api

	 constructor(private http: HttpClient) { }

	 getEditions (): Observable<Edition[]> {
	 	return this.http.get<Edition[]>(this.editionsUrl);
	 }
}
