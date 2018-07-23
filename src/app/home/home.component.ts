import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../products/shared/product.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[];
  
  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.getLatestProducts();
  }

  getLatestProducts(){
    this.productService.getProducts().subscribe(
      products => this.products = products.slice(0, 4),
      error => console.log(error)
    )
  }

}
