import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }            from './auth-guard.service';
import { AuthService }          from './auth.service';
import { LoginComponent }       from '../login/login.component';
import { RegisterComponent }       from '../register/register.component';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { RegisterConfirmComponent } from  '../register/register-confirm/register-confirm.component';

const authRoutes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'register/confirmation', component: RegisterConfirmComponent },
{ path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard]}  
];
// canActivate: [AuthGuard]
@NgModule({
  imports: [
  RouterModule.forChild(authRoutes)
  ],
  exports: [
  RouterModule
  ],
  providers: [
  AuthGuard,
  AuthService
  ]
})
export class AuthRoutingModule {}