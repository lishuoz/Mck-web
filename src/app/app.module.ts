import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }            from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { ProductsModule }      from './products/shared/products.module';
import { UploadModule }        from './upload/shared/upload.module';
import { AuthModule }          from './auth/shared/auth.module'; 

import { ProductService } from './products/shared/product.service';
import { PlayerService } from './service/player.service';
import { TeamService } from './service/team.service';
import { SeasonService } from './service/season.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';

import { ModalModule } from 'ngx-bootstrap/modal';

import { EditionService } from './service/edition.service';
import { LevelService } from './service/level.service';
import { SizeService } from './service/size.service';
import { ItemService } from './service/item.service';
import { LoaService } from './service/loa.service';
import { UploadService } from './upload/shared/upload.service';
import { AuthService } from './auth/shared/auth.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';

@NgModule({
  declarations: [
  AppComponent,
  NavbarComponent,
  CarouselComponent,
  HomeComponent,
  MessagesComponent,
  ],
  imports: [
  BrowserModule,
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
  ProductsModule,
  UploadModule,
  AuthModule,
  AppRoutingModule,
  ModalModule.forRoot(),
  ],
  providers: [
  ProductService,
  PlayerService,
  TeamService,
  SeasonService,
  EditionService,
  LevelService,
  SizeService,
  ItemService,
  LoaService,
  UploadService,
  AuthService,
  MessageService,
  ],
  // entryComponents: [ MessageModalComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
