import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/shared/auth-guard.service';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';

import { UploadComponent }    from '../upload.component';
import { UploadProductImagesComponent }	from '../upload-product-images/upload-product-images.component';
import { UploadOtherImagesComponent } from '../upload-other-images/upload-other-images.component';
import { UploadAdditionalImagesComponent } from '../upload-additional-images/upload-additional-images.component';

const uploadRoutes: Routes = [
{ path: 'upload',  component: UploadComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuardService] },
{ path: 'upload/:id/product-images', component: UploadProductImagesComponent },
{ path: 'upload/:id/additional-images', component: UploadAdditionalImagesComponent },
{ path: 'upload/:id/other-images', component: UploadOtherImagesComponent },
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