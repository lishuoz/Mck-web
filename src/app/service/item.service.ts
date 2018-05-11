import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from '../model/item';

import { environment } from '../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ItemService {
	 
	 private itemsUrl = environment.baseUrl+'/api/items';  // URL to web api

	 constructor(private http: HttpClient) { }

	 getItems (): Observable<Item[]> {
	 	return this.http.get<Item[]>(this.itemsUrl);
	 }
}
