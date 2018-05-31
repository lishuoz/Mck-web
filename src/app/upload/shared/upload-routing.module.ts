import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/shared/auth-guard.service';
import { CanDeactivateGuard } from '../../shared/can-deactivate-guard.service';

import { UploadComponent }    from '../upload.component';
import { UploadProductImagesComponent }	from '../upload-product-images/upload-product-images.component';
import { UploadOtherImagesComponent } from '../upload-other-images/upload-other-images.component';
import { UploadAdditionalImagesComponent } from '../upload-additional-images/upload-additional-images.component';
import { ProductEditComponent }				from '../product-edit/product-edit.component';

const uploadRoutes: Routes = [
{ path: 'upload',  component: UploadComponent, canActivate: [AuthGuard] },
{ path: 'upload/:id/product-images', component: UploadProductImagesComponent,  canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
{ path: 'upload/:id/additional-images', component: UploadAdditionalImagesComponent,  canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
{ path: 'upload/:id/additional-images', component: UploadAdditionalImagesComponent,  canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
{ path: 'upload/:id/other-images', component: UploadOtherImagesComponent, canDeactivate: [CanDeactivateGuard]},
{ path: 'products/:id/edit', component: ProductEditComponent },
];

@NgModule({
	imports: [
	RouterModule.forChild(uploadRoutes)
	],
	exports: [
	RouterModule
	]
})
export class UploadRoutingModule { }