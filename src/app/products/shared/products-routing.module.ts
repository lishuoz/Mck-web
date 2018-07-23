import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent }    	from '../product-list/product-list.component';
import { ProductDetailComponent }  	from '../product-detail/product-detail.component';
import { ProductUploadComponent } 	from '../product-upload/product-upload.component';
import { SaleStatusComponent } 		from '../product-upload/sale-status/sale-status.component';
import { UploadImagesComponent } 	from '../product-upload/upload-images/upload-images.component';
import { PreviewComponent } 		from '../product-upload/preview/preview.component';
import { AuthGuard } from '../../shared/auth-guard.service';
import { ProductUploadGuard } from '../../shared/product-upload-guard.service';
import { IncompleteProductGuardService } from '../../shared/incomplete-product-guard.service';


const productsRoutes: Routes = [
{ path: 'products',  component: ProductListComponent },
{ 
	path: 'products/:id',
	canActivate: [IncompleteProductGuardService],
	component: ProductDetailComponent },
{ 
	path: 'products/upload/:id', 
	canActivate: [AuthGuard, ProductUploadGuard],
	children: [
		{ path: '', component: ProductUploadComponent },
		{ path: 'sale-status', component: SaleStatusComponent },
		{ path: 'images', component: UploadImagesComponent },
		{ path: 'preview', component: PreviewComponent }
	]
},
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