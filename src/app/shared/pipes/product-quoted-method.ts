import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'productQuotedMethod'})
export class ProductQuotedMethodPipe implements PipeTransform {
	transform(status: string): string {
		switch(status) { 
			case 'fixed': {
				return '接受一口价';
			} 
			case 'quoted': {
				return '接受报价';
			} 
			case 'both': {
				return '接受一口价和报价';
			}  
			default: { 
				return status;
			} 
		} 
	}
}