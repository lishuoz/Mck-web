import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ProductListComponent }    from '../product-list/product-list.component';
import { ProductDetailComponent }  from '../product-detail/product-detail.component';

import { ProductService } from './product.service';

import { ProductRoutingModule } from './products-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ProductRoutingModule
	],
	declarations: [
		ProductListComponent,
		ProductDetailComponent
	],
	providers: [ ProductService ],
})

export class ProductsModule {}
