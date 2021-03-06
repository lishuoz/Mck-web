import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }		from './home/home.component';
import { LoginComponent }		from './auth/login/login.component';

const routes: Routes = [
// { path: 'dashboard', component: DashboardComponent,  },
{ path: '', component: HomeComponent },
{ path: '**', component: HomeComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}