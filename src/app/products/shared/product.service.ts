import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from '../../model/product';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ProductService {

	 private productsUrl = 'http://localhost:8000/api/products';  // URL to web api
	 private userProductsUrl = 'http://localhost:8000/api/user/products';
	 constructor(private http: HttpClient) { }

	 getProducts(): Observable<Product[]> {
	 	return this.http.get<Product[]>(this.productsUrl);
	 }

	 getProduct(id: number): Observable<Product> {
	 	const url = `${this.productsUrl}/${id}`;
	 	return this.http.get<Product>(url);
	 }

	 getUserProducts(userId): Observable<Product[]> {
	 	const userProductsUrl = `http://localhost:8000/api/user/${userId}/products`;
	 	return this.http.get<Product[]>(userProductsUrl);
	 }

	 addProduct(product: Product): Observable<any> {
	 	return this.http.post(this.productsUrl, product);
	 }

	}
