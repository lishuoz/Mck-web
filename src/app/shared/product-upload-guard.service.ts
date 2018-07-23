import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Product } from '../model/product';
import { AuthService } from '../auth/shared/auth.service';
import { ProductService } from '../products/shared/product.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProductUploadGuard implements CanActivate {
  private product: Product;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const productId = +route.params['id'];
    if (productId == 0) {
      return true;
    }
    return this.productService.getProduct(productId).map(
      product => {
        if (product.user.id == this.authService.user.id) {
          return true
        }
        this.router.navigate(['/dashboard']);
        return false;
      }
    )
    // return this.checkProductOwner(productId);
  }

  // checkProductOwner(productId: number): any {
  //   if (productId == 0) {
  //     return true;
  //   }
  //   this.productService.getProduct(productId).subscribe(
  //     product => this.product = product,
  //     error => console.log(error)
  //   )
  //   if (this.product) {
  //     return this.product.user.id == this.authService.user.id;
  //   }

  // }


  // checkProductOwner(productId: number): any {
  //   if (productId == 0) {
  //     return true;
  //   }
  //   this.productService.getProduct(productId).subscribe(
  //     product => this.product = product,
  //     error => console.log(error)
  //   )
  //   if (this.product) {
  //     return this.product.user.id == this.authService.user.id;
  //   }
  //   this.router.navigate(['/dashboard']);
  //   return false;
  // }
}
