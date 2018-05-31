import { Component, OnInit } 									from '@angular/core';
import { Router,ActivatedRoute, ParamMap } 						from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators} 		from '@angular/forms';
import { Subscription }											from 'rxjs/Subscription';

import { ProductService }	from '../../shared/product.service';

import { SaleStatus }		from '../../../model/saleStatus';
import { Product }			from '../../../model/product';

@Component({
	selector: 'app-sale-status',
	templateUrl: './sale-status.component.html',
	styleUrls: ['./sale-status.component.css']
})
export class SaleStatusComponent implements OnInit {
	saleStatusForm: FormGroup;
	saleStatus: SaleStatus;
	private sub: Subscription;
	// private product: Product;
	private productId: number;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private productService: ProductService,
		) {
		this.initForm();
	}

	initForm(): any {
		this.saleStatusForm = this.fb.group ({
			productId: '',
			forSale: ['', [Validators.required]],
			tradeMethod: [''],
			quotedMethod: [''],
			price: '',
		})
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe(
			params => {
				this.productId = +params['id'];
				this.productService.getProduct(this.productId).subscribe(
					product => {
						if (product.sale_status) {
							this.saleStatusForm.patchValue({
								productId: this.productId,
								forSale: product.sale_status.forSale,
								tradeMethod: product.sale_status.tradeMethod,
								quotedMethod: product.sale_status.quotedMethod,
								price: product.sale_status.price
							})
						}
						
					},
					error => console.log(error)
					);
			});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}


	handleforSaleChange($event){
		let value = $event.target.value;
		const priceControl = this.saleStatusForm.get('price');
		const tradeMethodControl = this.saleStatusForm.get('tradeMethod');
		const quotedMethodControl = this.saleStatusForm.get('quotedMethod');
		if(value === 'forSale'){
			tradeMethodControl.setValidators([Validators.required]);
			quotedMethodControl.setValidators([Validators.required]);
			priceControl.enable();
			priceControl.reset();
			tradeMethodControl.enable();
			quotedMethodControl.enable();
		}else{
			priceControl.disable();
			tradeMethodControl.disable();
			quotedMethodControl.disable();
			priceControl.reset();
			tradeMethodControl.reset();
			quotedMethodControl.reset();
		}
	}

	handleQuotedMethodChange($event){
		let value = $event.target.value;
		const priceControl = this.saleStatusForm.get('price');
		if(value === 'fixed' || value === 'both'){
			priceControl.enable();
			priceControl.setValidators([Validators.required, Validators.min(0), Validators.max(999999), Validators.pattern('^[0-9]+$')]);
			priceControl.reset();
		}else{
			priceControl.disable();
			priceControl.reset();
		}
	}

	onLater(){
		this.router.navigate(['products/upload/' + this.productId + '/images']);
	}

	onBack(){
		// console.log('/products/upload/', this.productId)
		this.router.navigate(['/products/upload/', this.productId]);
	}

	onSubmit(){
		this.saleStatusForm.patchValue({'productId': this.productId});
		let saleStatus = Object.assign({},this.saleStatus,this.saleStatusForm.value);
		this.productService.addSaleStatus(saleStatus).subscribe(
			response => {
				this.router.navigate(['products/upload/' + this.productId + '/images']);
			},
			error => console.log(error)
			);
	}

}
