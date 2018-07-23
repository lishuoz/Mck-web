import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'productStatus'})
export class ProductStatusPipe implements PipeTransform {
	transform(status: string): string {
		switch(status) { 
			case 'unverified': {
				return '尚未提交审核';
			} 
			case 'pending': {
				return '审核中';
			} 
			case 'rejected': {
				return '审核未通过';
			} 
			case 'approved': {
				return '审核通过';
			}
			default: { 
				return status;
			} 
		} 
	}
}
