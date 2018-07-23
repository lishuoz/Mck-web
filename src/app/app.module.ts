import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ProductsModule } from './products/shared/products.module';
import { AuthModule } from './auth/shared/auth.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';

import { AuthService } from './auth/shared/auth.service';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    HttpClientModule,
    ProductsModule,
    AuthModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
