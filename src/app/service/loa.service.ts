import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Loa } from '../model/loa';

import { environment } from '../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoaService {
	 
	 private loasUrl = environment.baseUrl+'/api/loas';  // URL to web api

	 constructor(private http: HttpClient) { }

	 getLoas (): Observable<Loa[]> {
	 	return this.http.get<Loa[]>(this.loasUrl);
	 }
}
