import { Component, OnInit } from '@angular/core';

import { Player } from '../model/player';
import { Team } from '../model/team';
import { Product } from '../model/product';
import { Season } from '../model/season';
import { Edition } from '../model/edition';
import { Level } from '../model/level';
import { Size } from '../model/size';
import { Item } from '../model/item';
import { Loa } from '../model/loa';

import { ProductService } from '../products/shared/product.service';
import { TeamService } from '../service/team.service';
import { PlayerService } from '../service/player.service';
import { SeasonService } from '../service/season.service';
import { EditionService } from '../service/edition.service';
import { LevelService } from '../service/level.service';
import { SizeService } from '../service/size.service';
import { ItemService } from '../service/item.service';
import { LoaService } from '../service/loa.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
	selector: 'app-form-upload',
	templateUrl: './form-upload.component.html',
	styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {
	private players: Player[];
	private teams: Team[];
	private seasons: Season[];
	private editions: Edition[];
	private levels: Level[];
	private sizes: Size[];
	private items: Item[];
	private loas: Loa[];

	private selectedPlayers: Player[];
	private selectedTeam: Team;
	private selectedSeasons: Season[];
	private selectedEdition: Edition;
	private selectedLevel: Level;
	private selectedSizes: Size[];
	private selectedItems: Item[];
	private selectedLoas: Loa[];
	private selectedForSale = "true";
	private selectedTradeMethod = "platform";
	private selectedQuotedMethod = "fixed";
	private description = "";
	private images = new FormData();
	public uploadedImages = [];
	public formData = new FormData();


	private price: number;
	private note: string;

	private product: Product = {};

	private config = {
		url: "http://localhost:8000/api/upload-image",
		acceptedFiles: "image/*",
		uploadMultiple: true,
		paramName: "images",
		addRemoveLinks: true,
		maxFilesize: 2, // MB
		dictRemoveFile: "删除文件",
		dictDefaultMessage: "选择或拖动图片上传",
		dictMaxFilesExceeded: "上传文件超过最大限制",
	}

	constructor(
		private playerSerivce: PlayerService,
		private productService: ProductService,
		private teamService: TeamService,
		private seasonService: SeasonService,
		private editionService: EditionService,
		private levelService: LevelService,
		private sizeService: SizeService,
		private itemService: ItemService,
		private loaService: LoaService,
		private http: HttpClient
		) { }

	getPlayers(): void {
		this.playerSerivce.getPlayers().subscribe(players => this.players = players)
	}
	getTeams(): void {
		this.teamService.getTeams().subscribe(teams => this.teams = teams)
	}
	getSeasons(): void {
		this.seasonService.getSeasons().subscribe(seasons => this.seasons = seasons)
	}
	getEditons(): void {
		this.editionService.getEditions().subscribe(editions => this.editions = editions)
	}
	getLevels(): void {
		this.levelService.getLevels().subscribe(levels => this.levels = levels)
	}
	getSizes(): void {
		this.sizeService.getSizes().subscribe(sizes => this.sizes = sizes)
	}
	getItems(): void {
		this.itemService.getItems().subscribe(items => this.items = items)
	}
	getLoas(): void {
		this.loaService.getLoas().subscribe(loas => this.loas = loas)
	}

	onUploadSuccess($event){
		let file: File = $event[0];
		this.uploadedImages.push(file);
	}
	
	onRemovedFile($event){
		this.uploadedImages.splice(this.uploadedImages.indexOf($event), this.uploadedImages.indexOf($event)+1);
	}

	addProduct():void {
		this.product.user = "1";
		this.product.players = this.selectedPlayers;
		this.product.team = this.selectedTeam;
		this.product.seasons = this.selectedSeasons;
		this.product.edition = this.selectedEdition;
		this.product.level = this.selectedLevel;
		this.product.sizes = this.selectedSizes;
		this.product.items = this.selectedItems;
		this.product.loas = this.selectedLoas;
		this.product.note = this.note;
		this.product.forSale = this.selectedForSale === "true";
		this.product.tradeMethod = this.selectedTradeMethod;
		this.product.quotedMethod = this.selectedQuotedMethod;
		this.product.description = this.description;
		this.product.price = this.price;
		for(var i=0; i<this.uploadedImages.length; i++){
			this.formData.append('photo[]', this.uploadedImages[i], this.uploadedImages[i].name);
		}
		this.product.images = this.formData;

		// this.formData.append('user', '1'); //Hard coded
		// this.formData.append('players', this.selectedPlayers);
		// this.formData.append('team', this.selectedTeam);
		// this.formData.append('seasons', this.selectedSeasons);
		// this.formData.append('edition', this.selectedEdition);
		// this.formData.append('level', this.selectedLevel);
		// this.formData.append('sizes', this.selectedSizes);
		// this.formData.append('items', this.selectedItems);
		// this.formData.append('loas', this.selectedLoas);
		// this.formData.append('note', this.note);
		// this.formData.append('forSale', (this.selectedForSale == "true"));
		// this.formData.append('tradeMethod', this.selectedTradeMethod);
		// this.formData.append('quotedMethod', this.selectedQuotedMethod);
		// this.formData.append('description', this.description);
		// this.formData.append('price', this.price);
		// for(var i=0; i<this.images.length; i++){
		// 	this.formData.append('photo[]', this.images[i], this.images[i].name);
		// }
		this.productService.addProduct(this.product)
		.subscribe(
			response => console.log(response)
			);
	}

	ngOnInit() {
		this.getPlayers();
		this.getTeams();
		this.getSeasons();
		this.getEditons();
		this.getLevels();
		this.getSizes();
		this.getItems();
		this.getLoas()
	}
}
