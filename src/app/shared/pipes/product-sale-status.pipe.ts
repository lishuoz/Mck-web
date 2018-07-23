import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'productSaleStatus'})
export class ProductSaleStatusPipe implements PipeTransform {
	transform(status: string): string {
		switch(status) { 
			case 'forSale': {
				return '出售中';
			} 
			case 'sold': {
				return '已售出';
			} 
			case 'notForSale': {
				return '收藏展示';
			}  
			default: { 
				return status;
			} 
		} 
	}
}