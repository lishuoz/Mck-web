import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { FormControl, FormGroup, FormBuilder} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


import { Player } from '../../model/player';
import { Team } from '../../model/team';
import { Season } from '../../model/season';
import { Edition } from '../../model/edition';
import { Level } from '../../model/level';
import { Size } from '../../model/size';
import { Item } from '../../model/item';
import { Loa } from '../../model/loa';
import { Product } from '../../model/product';

// const httpOptions = {
// 	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable()
export class UploadService {
	private baseUrl = 'http://localhost:8000/api/';
	private playersUrl = this.baseUrl + 'players';
	private teamsUrl = this.baseUrl + 'teams';
	private itemsUrl = this.baseUrl + 'items'; 
	private seasonsUrl = this.baseUrl + 'seasons'; 
	private editionsUrl = this.baseUrl + 'editions'; 
	private levelsUrl = this.baseUrl + "levels";
	private sizesUrl = this.baseUrl + "sizes";
	private loasUrl = this.baseUrl + "loas";
	private productsUrl = this.baseUrl + "products";
	private imagesUrl = this.baseUrl + "images";

	constructor(private http: HttpClient) { }

	getPlayers (): Observable<Player[]> {
		return this.http.get<Player[]>(this.playersUrl);
	}
	getTeams (): Observable<Team[]> {
		return this.http.get<Team[]>(this.teamsUrl);
	}
	getItems (): Observable<Item[]> {
		return this.http.get<Item[]>(this.itemsUrl);
	}
	getSeasons (): Observable<Season[]> {
		return this.http.get<Season[]>(this.seasonsUrl);
	}
	getEditions (): Observable<Edition[]> {
		return this.http.get<Edition[]>(this.editionsUrl);
	}
	getLevels (): Observable<Level[]> {
		return this.http.get<Level[]>(this.levelsUrl);
	}
	getSizes (): Observable<Size[]> {
		return this.http.get<Size[]>(this.sizesUrl);
	}
	getLoas (): Observable<Loa[]> {
		return this.http.get<Loa[]>(this.loasUrl);
	}

	addProduct(product: Product): Observable<Product> {
		return this.http.post(this.productsUrl, product);
	}

	addImages(image: FormData): Observable<any> {
		return this.http.post(this.imagesUrl, image)
	}
}
