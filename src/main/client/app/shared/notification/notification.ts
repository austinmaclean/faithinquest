import {Injectable, EventEmitter} from '@angular/core';

export class HttpLoaderEventEmitter extends EventEmitter<boolean> {}

export const NOTIFICATION_PROVIDERS = [HttpLoaderEventEmitter];