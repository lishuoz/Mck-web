import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProductService } from '../products/shared/product.service';
import { Product } from '../model/product';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IncompleteProductGuardService implements CanActivate {
  private product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const productId = +route.params['id'];

    return this.productService.getProduct(productId).map(
      product => {
        if (product) {
          if (product.status == 'approved') {
            return true;
          }
          this.router.navigate(['login'])
          return false;
        }
      },
    )
  }
}
