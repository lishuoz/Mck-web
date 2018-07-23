import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Player }		from '../model/player';
import { Team }			from '../model/team';
import { Season }		from '../model/season';
import { Level }		from '../model/level';
import { Item }			from '../model/item';
import { Edition }		from '../model/edition';
import { Loa }			from '../model/loa';
import { Size }			from '../model/size';

import { environment } 			from '../../environments/environment';

@Injectable()
export class CoreService {
	private baseUrl = environment.baseUrl+'/api/';

	constructor(private http: HttpClient) { }

	getPlayers(): Observable<Player[]> {
		const url = this.baseUrl + 'players';
		return this.http.get<Player[]>(url);
	}

	getTeams(): Observable<Team[]> {
		const url = this.baseUrl + 'teams';
		return this.http.get<Team[]>(url);
	}

	getSeasons(): Observable<Season[]> {
		const url = this.baseUrl + 'seasons';
		return this.http.get<Season[]>(url);
	}

	getLevels(): Observable<Level[]> {
		const url = this.baseUrl + 'levels';
		return this.http.get<Level[]>(url);
	}

	getItems(): Observable<Item[]> {
		const url = this.baseUrl + 'items';
		return this.http.get<Item[]>(url);
	}

	getEditions(): Observable<Edition[]> {
		const url = this.baseUrl + 'editions';
		return this.http.get<Edition[]>(url);
	}

	getLoas(): Observable<Loa[]> {
		const url = this.baseUrl + 'loas';
		return this.http.get<Loa[]>(url);
	}

	getSizes(): Observable<Size[]> {
		const url = this.baseUrl + 'sizes';
		return this.http.get<Size[]>(url);
	}

}
