import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../../shared/auth-guard.service';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
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
  ]
})
export class AuthRoutingModule { }