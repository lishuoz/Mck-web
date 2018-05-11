import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ProductsComponent }		from '../products.component';
import { ProductListComponent }    from '../product-list/product-list.component';
import { ProductDetailComponent }  from '../product-detail/product-detail.component';

import { ProductService } from './product.service';

import { ProductRoutingModule } from './products-routing.module';

import { NgxImageZoomModule } from 'ngx-image-zoom';
import {ImageZoomModule} from 'angular2-image-zoom';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ProductRoutingModule,
		ImageZoomModule,
		NgxImageZoomModule.forRoot()
	],
	declarations: [
		ProductsComponent,
		ProductListComponent,
		ProductDetailComponent
	],
	providers: [ ProductService ],
})

export class ProductsModule {}
