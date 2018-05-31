import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Product }			from '../../model/product';
import { Team }				from '../../model/team';
import { ProductService }	from '../../products/shared/product.service';
import { UploadService }	from '../shared/upload.service';

@Component({
	selector: 'app-product-edit',
	templateUrl: './product-edit.component.html',
	styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
	product: Product;
	editForm: FormGroup;
	teams: Team[];
	formData = new FormData();
	id: number;
	updatedProduct: Product;
	constructor(
		private uploadService: UploadService,
		private productService: ProductService,
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		){
		this.createForm();
		this.getTeams();
	}

	createForm() {
		this.editForm = this.fb.group({
			id: '',
			forSale: '',
			tradeMethod: '',
			quotedMethod: '',
			price: '',
		})
	}

	getTeams(): void {
		this.uploadService.getTeams().subscribe(teams => this.teams = teams)
	}

	customSearchTeams(term: string, item: Team) {
		term = term.toLocaleLowerCase();
		return item.name_us.toLocaleLowerCase().indexOf(term) > -1 
		|| item.name_us.toLocaleLowerCase() === term
		|| item.name.toLocaleLowerCase().indexOf(term) > -1 
		|| item.name.toLocaleLowerCase() === term
	}

	handleforSaleChange($event){
		if($event.target.value == "false" || $event.target.value == "sold"){
			this.editForm.patchValue({
				tradeMethod: '',
				quotedMethod: '',
				price: ''
			});
		}
	}

	handleQuoteMethodChange($event){
		if($event.target.value == "quoted"){
			this.editForm.patchValue({
				price: ''
			});
		}
	}

	ngOnInit() {
		let id = this.route.snapshot.paramMap.get('id');
		this.productService.getProduct(+id).subscribe(
			product => {
				this.product = product;
				this.editForm.patchValue({
					id: this.product.id,
					// forSale: this.product.forSale,
					// tradeMethod: this.product.tradeMethod,
					// quotedMethod: this.product.quotedMethod,
					// price: this.product.price
				})
			})
	}

	onSubmit(){
		let updatedProduct = Object.assign({}, this.updatedProduct,this.editForm.value);
		this.productService.updateProduct(updatedProduct).subscribe(
			response => {
				console.log(response);
				this.router.navigate(['/dashboard']);
			}
			);
	}

}
