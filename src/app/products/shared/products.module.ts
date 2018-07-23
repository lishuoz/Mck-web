import { NgModule }       			from '@angular/core';
import { SharedModule }				from '../../shared/shared.module';
import { NgSelectModule } 			from '@ng-select/ng-select';

import { ProductsComponent }		from '../products.component';
import { ProductListComponent }    	from '../product-list/product-list.component';
import { ProductDetailComponent }  	from '../product-detail/product-detail.component';
import { ProductUploadComponent }	from '../product-upload/product-upload.component';
import { SaleStatusComponent } 		from '../product-upload/sale-status/sale-status.component';
import { UploadImagesComponent } 	from '../product-upload/upload-images/upload-images.component';

import { ProductService } 			from './product.service';

import { ProductRoutingModule } 	from './products-routing.module';

import { NgxImageZoomModule } 		from 'ngx-image-zoom';
import { DropzoneModule } 			from 'ngx-dropzone-wrapper';
import { ProductItemComponent } from '../product-item/product-item.component';
import { PreviewComponent } from '../product-upload/preview/preview.component';
import { ProductUploadGuard } from '../../shared/product-upload-guard.service';
import { IncompleteProductGuardService } from '../../shared/incomplete-product-guard.service';

// import { DROPZONE_CONFIG } 			from 'ngx-dropzone-wrapper';

@NgModule({
	imports: [
		SharedModule,
		NgxImageZoomModule.forRoot(),
		DropzoneModule,
		NgSelectModule,
		ProductRoutingModule
	],
	declarations: [
		ProductsComponent,
		ProductListComponent,
		ProductDetailComponent,
		ProductUploadComponent,
		SaleStatusComponent,
		UploadImagesComponent,
		ProductItemComponent,
		PreviewComponent
	],
	exports:[
		ProductItemComponent,
	],
	providers: [ 
		ProductService, ProductUploadGuard, IncompleteProductGuardService,
	],
})

export class ProductsModule {}
