import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent }    	from '../product-list/product-list.component';
import { ProductDetailComponent }  	from '../product-detail/product-detail.component';
import { ProductUploadComponent } 	from '../product-upload/product-upload.component';
import { SaleStatusComponent } 		from '../product-upload/sale-status/sale-status.component';
import { UploadImagesComponent } 	from '../product-upload/upload-images/upload-images.component';

const productsRoutes: Routes = [
{ path: 'products',  component: ProductListComponent },
{ path: 'products/:id',	component: ProductDetailComponent },
{ path: 'products/upload/:id', component: ProductUploadComponent },
{ path: 'products/upload/:id/sale-status', component: SaleStatusComponent },
{ path: 'products/upload/:id/images', component: UploadImagesComponent },
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