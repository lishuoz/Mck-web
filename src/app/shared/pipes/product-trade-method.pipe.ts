import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'productTradeMethod'})
export class ProductTradeMethodPipe implements PipeTransform {
	transform(status: string): string {
		switch(status) { 
			case 'platform': {
				return '支持平台担保交易';
			} 
			case 'private': {
				return '支持私下交易';
			} 
			case 'both': {
				return '支持平台担保和私下交易';
			}  
			default: { 
				return status;
			} 
		} 
	}
}