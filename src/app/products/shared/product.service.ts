import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from '../../model/product';
import { SaleStatus } from '../../model/saleStatus'; 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ProductService {
	private baseUrl: string = environment.baseUrl+'/api/';
	private productsUrl = environment.baseUrl+'/api/products';  // URL to web api
	private userProductsUrl = environment.baseUrl+'/api/user/products';
	constructor(private http: HttpClient) { }

	getProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(this.productsUrl);
	}

	getProduct(id: number): Observable<Product> {
		const url = `${this.productsUrl}/${id}`;
		return this.http.get<Product>(url);
	}

	getUserProducts(userId): Observable<Product[]> {
		const userProductsUrl = environment.baseUrl+`/api/user/${userId}/products`;
		return this.http.get<Product[]>(userProductsUrl);
	}

	addProduct(product: Product): Observable<any> {
		const url = this.baseUrl + 'products';
		return this.http.post(url, product);
	}

	addSaleStatus(saleStatus: SaleStatus): Observable<any> {
		const url = this.baseUrl + 'products/sale-status';
		return this.http.post(url, saleStatus);
	}

	editSaleStatus(saleStatus: SaleStatus): Observable<any> {
		const url = this.baseUrl + 'products/sale-status';
		return this.http.put(url, saleStatus);
	}

	deleteFrontImage(id: number): Observable<Product> {
		const url = this.baseUrl + 'front-image/' + id;
		return this.http.delete<Product>(url);
	}

	deleteBackImage(id: number): Observable<Product> {
		const url = this.baseUrl + 'back-image/' + id;
		return this.http.delete<Product>(url);
	}

	deleteLevelImage(id: number, fileName:string): Observable<Product> {
		const url = this.baseUrl + 'level-image/' + id + '/' + fileName;
		return this.http.delete<Product>(url);
	}

	deleteLoaImage(id: number, fileName:string): Observable<Product> {
		const url = this.baseUrl + 'loa-image/' + id + '/' + fileName;
		return this.http.delete<Product>(url);
	}

	deleteOtherImage(id: number, fileName:string): Observable<Product> {
		const url = this.baseUrl + 'other-image/' + id + '/' + fileName;
		return this.http.delete<Product>(url);
	}

	updateProduct(product: Product | number): Observable<Product>{
		const id = typeof product === 'number' ? product : product.id;
		const url = this.baseUrl + `products/${id}`;
		return this.http.patch(url, product);
	}

	updateProductStatus(product: Product | number): Observable<any>{
		const id = typeof product === 'number' ? product : product.id;
		const url = this.baseUrl + `products/status/${id}`;
		return this.http.patch(url, product);
	}

	deleteProduct(product: Product | number): Observable<Product> {
		const id = typeof product === 'number' ? product : product.id;
		const url = `${this.productsUrl}/${id}`;
		return this.http.delete<Product>(url, httpOptions);
	}

}
