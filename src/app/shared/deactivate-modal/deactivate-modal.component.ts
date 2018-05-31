import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { UploadService }		from '../../upload/shared/upload.service';
@Component({
	selector: 'app-deactivate-modal',
	templateUrl: './deactivate-modal.component.html',
	styleUrls: ['./deactivate-modal.component.css']
})
export class DeactivateModalComponent implements OnInit {
	cancelUpload: boolean = false;
	constructor(
		public bsModalRef: BsModalRef,
		private uploadService: UploadService
		) { }

	ngOnInit() {
	}

	delete(){
		this.uploadService.cancelUpload = true;
		this.bsModalRef.hide();
		console.log(this.uploadService.cancelUpload);

	}

}
