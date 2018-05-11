import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class MessageService {
	messages: string[] = [];

	add(message: string) {
		this.messages.push(message);
	}

	clear() {
		this.messages = [];
	}

}
