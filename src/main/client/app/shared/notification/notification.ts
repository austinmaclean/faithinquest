import {EventEmitter} from '@angular/core';

export class HttpLoaderEventEmitter extends EventEmitter<boolean> {}
export class MessagesEventEmitter extends EventEmitter<any> {}

export const NOTIFICATION_PROVIDERS = [HttpLoaderEventEmitter, MessagesEventEmitter];