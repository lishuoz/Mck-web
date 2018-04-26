import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Size } from '../model/size';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SizeService {
	 
	 private sizesUrl = 'http://localhost:8000/api/sizes';  // URL to web api

	 constructor(private http: HttpClient) { }

	 getSizes(): Observable<Size[]> {
	 	return this.http.get<Size[]>(this.sizesUrl);
	 }
}
