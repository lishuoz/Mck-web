import { Component, OnInit } 									from '@angular/core';
import { Router,ActivatedRoute, ParamMap } 						from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators} 		from '@angular/forms';
import { Subscription }											from 'rxjs/Subscription';

import { Player } 			from '../../model/player';
import { Team } 			from '../../model/team';
import { Season }			from '../../model/season';
import { Level }			from '../../model/level';
import { Item }				from '../../model/item';
import { Edition }			from '../../model/edition';
import { Loa }				from '../../model/loa';
import { Size }				from '../../model/size';
import { Product }			from '../../model/product';
import { User }				from '../../model/user';

import { ProductService }	from '../shared/product.service';
import { AuthService }		from '../../auth/shared/auth.service';
import { CoreService } from '../../core/core.service';

@Component({
	selector: 'app-product-upload',
	templateUrl: './product-upload.component.html',
	styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {
	pageTitle: string = '编辑物品';
	uploadForm: FormGroup;
	players: Player[];
	teams: Team[];
	seasons: Season[];
	levels: Level[];
	items: Item[];
	editions: Edition[];
	loas: Loa[];
	sizes: Size[];
	private sub: Subscription;
	product: Product;
	user: User;
	isEdit: boolean;
	isLoading: boolean = true;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private coreService: CoreService,
		private authService: AuthService,
		private productService: ProductService,
		) {
		this.user = this.authService.user;
		this.getPlayers();
		this.getTeams();
		this.getSeasons();
		this.getLevels();
		this.getItems();
		this.getEditions();
		this.getLoas();
		this.getSizes();
		this.initForm();
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe(
			params => {
				let id = +params['id'];
				if(id == 0){
					this.pageTitle = '上传物品';
					this.isEdit = false;
					this.uploadForm.reset();
					this.isLoading = false;
				}else{
					this.isEdit = true;
					let sub = this.productService.getProduct(id).subscribe(
						product => {
							this.uploadForm.patchValue({
								id: product.id,
								players: product.players.map(value => value.id),
								team: product.team.id,
								seasons: product.seasons.map(value => value.id),
								level: product.level.id,
								items: product.items.map(value => value.id),
								edition: product.edition.id,
								loas: product.loas.map(value => value.id),
								sizes: product.sizes.map(value => value.id),
								note: product.note,
								description: product.description,
							});
							this.isLoading = false;
						},
						error => console.log(error),
						);
				}
			});
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
	}

	initForm(): any {
		this.uploadForm = this.fb.group ({
			userId: '',
			id: '',
			players: [],
			team: ['', Validators.required],
			seasons: ['', Validators.required],
			level: ['', Validators.required],
			items: ['', Validators.required],
			edition: ['', Validators.required],
			loas: [],
			sizes: ['', Validators.required],
			note: ['', Validators.maxLength(15)],
			description: ['', Validators.maxLength(1000)],
		})
	}

	getPlayers(){
		this.coreService.getPlayers().subscribe(
			players => this.players = players,
			error => console.log(error)
			);
	}

	getTeams(){
		this.coreService.getTeams().subscribe(
			teams => this.teams = teams,
			error => console.log(error)
			);
	}

	getSeasons(){
		this.coreService.getSeasons().subscribe(
			seasons => this.seasons = seasons,
			error => console.log(error)
			);
	}

	getLevels(){
		this.coreService.getLevels().subscribe(
			levels => this.levels = levels,
			error => console.log(error)
			);
	}

	getItems(){
		this.coreService.getItems().subscribe(
			items => this.items = items,
			error => console.log(error)
			);
	}

	getEditions(){
		this.coreService.getEditions().subscribe(
			editions => this.editions = editions,
			error => console.log(error)
			);
	}

	getLoas(){
		this.coreService.getLoas().subscribe(
			loas => this.loas = loas,
			error => console.log(error)
			);
	}

	getSizes(){
		this.coreService.getSizes().subscribe(
			sizes => this.sizes = sizes,
			error => console.log(error)
			);
	}

	//Search with English name
	customSearch(term: string, item: any) {
		term = term.toLocaleLowerCase();
		return item.name_us.toLocaleLowerCase().indexOf(term) > -1 
		|| item.name_us.toLocaleLowerCase() === term
		|| item.name.toLocaleLowerCase().indexOf(term) > -1 
		|| item.name.toLocaleLowerCase() === term
	}
	
	onSubmit(){
		this.uploadForm.patchValue({'userId': this.user.id});
		let product = Object.assign({},this.product,this.uploadForm.value);
		this.productService.addProduct(product).subscribe(
			product => {
				//navigate to product sale
				this.router.navigate(['/products/upload/'+product.id+'/sale-status']);
			},
			error => console.log(error)
			)
	}

	onEdit(){
		this.uploadForm.patchValue({'userId': this.user.id});
		let product = Object.assign({},this.product,this.uploadForm.value);
		this.productService.updateProduct(product).subscribe(
			product => {
				//navigate to product sale
				this.router.navigate(['dashboard']);
			},
			error => console.log(error)
			)
	}

}
