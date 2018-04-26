import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UploadService } from './shared/upload.service';
import { AuthService }	from '../auth/shared/auth.service';

import { Product } from '../model/product';
import { Player } from '../model/player';
import { Team } from '../model/team';
import { Item } from '../model/item';
import { Season } from '../model/season';
import { Edition } from '../model/edition';
import { Level } from '../model/level';
import { Size } from '../model/size';
import { Loa } from '../model/loa';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
	players: Player[];
	playersBuffer = [];
	bufferSize = 50;
	loading = false;

	private teams: Team[];
	private seasons: Season[];
	private editions: Edition[];
	private levels: Level[];
	private sizes: Size[];
	private items: Item[];
	private loas: Loa[];
	private uploadForm: FormGroup;
	private step: number = 1;
	private product: Product;
	userId;
	constructor(
		private uploadService: UploadService,
		private fb: FormBuilder,
		private router: Router,
		private authService: AuthService,
		) {
		this.createForm();
	}

	createForm() {
		this.uploadForm = this.fb.group ({
			players: [''],
			team: '',
			items: [''],
			seasons: [''],
			edition: '',
			level: '',
			sizes: [''],
			loas: [''],
			note: '',
			description: '',
			forSale: 'false',
			tradeMethod: '',
			quoteMethod: '',
			price: '',
			userId: '',
		});
	}
	// getPlayers(): void {
	// 	this.uploadService.getPlayers().subscribe(players => this.players = players)
	// }
	getTeams(): void {
		this.uploadService.getTeams().subscribe(teams => this.teams = teams)
	}
	getItems(): void {
		this.uploadService.getItems().subscribe(items => this.items = items)
	}
	getSeasons(): void {
		this.uploadService.getSeasons().subscribe(seasons => this.seasons = seasons)
	}
	getEditions(): void {
		this.uploadService.getEditions().subscribe(editions => this.editions = editions)
	}
	getLevels(): void {
		this.uploadService.getLevels().subscribe(levels => this.levels = levels)
	}
	getSizes(): void {
		this.uploadService.getSizes().subscribe(sizes => this.sizes = sizes)
	}
	getLoas(): void {
		this.uploadService.getLoas().subscribe(loas => this.loas = loas)
	}

	customSearchFn(term: string, item: Player) {
		term = term.toLocaleLowerCase();
		return item.name_us.toLocaleLowerCase().indexOf(term) > -1 
		|| item.name_us.toLocaleLowerCase() === term
		|| item.name.toLocaleLowerCase().indexOf(term) > -1 
		|| item.name.toLocaleLowerCase() === term
	}


	changeStep(step){
		this.step = step;
	}

	handleforSaleChange($event){
		if($event.target.value == "false"){
			this.uploadForm.patchValue({
				tradeMethod: '',
				quoteMethod: '',
				price: ''
			});
		}
	}

	handleQuoteMethodChange($event){
		if($event.target.value == "quoted"){
			this.uploadForm.patchValue({
				price: ''
			});
		}
	}

	onSubmit(){
		this.uploadForm.patchValue({'userId': this.userId});
		let product = Object.assign({},this.product,this.uploadForm.value);
		this.uploadService.addProduct(product)
		.subscribe(
			(product) => {
				this.product = product;
				this.uploadForm.reset();
				this.router.navigate(['upload/'+this.product.id+'/images']);
			},
			error => console.log('Error ', error),
			);
		
	}

	fetchMore() {
		const len = this.playersBuffer.length;
		const more = this.players.slice(len, this.bufferSize + len);
		this.loading = true;
        // using timeout here to simulate backend API delay
        setTimeout(() => {
        	this.loading = false;
        	this.playersBuffer = this.playersBuffer.concat(more);
        }, 200)
    }


    ngOnInit() {

    	this.uploadService.getPlayers().subscribe(
    		players => {
    			this.players = players;
    			this.playersBuffer = this.players.slice(0, this.bufferSize);
    		}
    		);
    	this.getTeams();
    	this.getItems();
    	this.getSeasons();
    	this.getEditions();
    	this.getLevels();
    	this.getSizes();
    	this.getLoas();
    	this.authService.getUser()
    	.subscribe(
    		response => {
    			this.userId = response.id;
    		}
    		)
    }

}
