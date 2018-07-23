import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { CarouselComponent } from './carousel/carousel.component';
import { CoreService } from './core.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    NavbarComponent,
    CarouselComponent,
  ],
  exports:[
    NavbarComponent,
    CarouselComponent
  ],
  providers: [CoreService]
})
export class CoreModule { }
