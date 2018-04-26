import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent }    from '../product-list/product-list.component';
import { ProductDetailComponent }  from '../product-detail/product-detail.component';


const productsRoutes: Routes = [
{ path: 'products',  component: ProductListComponent },
{ 
	path: 'products/:id',
	component: ProductDetailComponent
}
];

@NgModule({
	imports: [
		RouterModule.forChild(productsRoutes)
	],
	providers: [
	],
	exports: [
		RouterModule
	]
})
export class ProductRoutingModule { }