import { NgModule } 			from '@angular/core';
import { CommonModule } 		from '@angular/common';
import { ReactiveFormsModule } 	from '@angular/forms';

import { LoginComponent } 		from '../login/login.component';
import { DashboardComponent } 	from '../dashboard/dashboard.component';
import { RegisterComponent }	from '../register/register.component';
import { RegisterConfirmComponent } from  '../register/register-confirm/register-confirm.component';

import { AuthRoutingModule } 	from './auth-routing.module';

import { AuthService } 			from './auth.service';
// import { AuthStore }			from './auth.store';
@NgModule({
	imports: [
	CommonModule,
	AuthRoutingModule,
	ReactiveFormsModule
	],
	declarations: [
	LoginComponent,
	RegisterComponent,
	DashboardComponent,
	RegisterConfirmComponent
	],
	providers:[
	AuthService,
	// AuthStore
	],
})
export class AuthModule { }
