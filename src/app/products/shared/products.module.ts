import { NgModule }       			from '@angular/core';
import { SharedModule }				from '../../shared/shared.module';

import { ProductsComponent }		from '../products.component';
import { ProductListComponent }    	from '../product-list/product-list.component';
import { ProductDetailComponent }  	from '../product-detail/product-detail.component';
import { ProductUploadComponent }	from '../product-upload/product-upload.component';
import { SaleStatusComponent } 		from '../product-upload/sale-status/sale-status.component';
import { UploadImagesComponent } 	from '../product-upload/upload-images/upload-images.component';

import { ProductService } 			from './product.service';

import { ProductRoutingModule } 	from './products-routing.module';

import { NgxImageZoomModule } 		from 'ngx-image-zoom';
import { ImageZoomModule } 			from 'angular2-image-zoom';
import { DropzoneModule } 			from 'ngx-dropzone-wrapper';
import { ProductImageService } from './product-image.service';
// import { DROPZONE_CONFIG } 			from 'ngx-dropzone-wrapper';

@NgModule({
	imports: [
	SharedModule,
	ProductRoutingModule,
	ImageZoomModule,
	NgxImageZoomModule.forRoot(),
	DropzoneModule,
	],
	declarations: [
	ProductsComponent,
	ProductListComponent,
	ProductDetailComponent,
	ProductUploadComponent,
	SaleStatusComponent,
	UploadImagesComponent
	],
	providers: [ 
	ProductService, ProductImageService,
	],
})

export class ProductsModule {}
