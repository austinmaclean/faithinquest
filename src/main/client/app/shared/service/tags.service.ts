import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {
    GET, PUT, POST,
    DELETE, BaseUrl, Headers,
    Produces, MediaType, DefaultHeaders,
    Path, Body, Query, QueryObject
} from './rest-client';
import {BaseService} from './base.service';
import {HttpLoaderService} from '../http-loader/httpLoaderService';
import {HttpErrorHandlerService} from '../http-error-handler/httpErrorHandlerService';

@Injectable()
@BaseUrl('/api/')
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})

export class TagsService extends BaseService {

    constructor(protected http:Http,
                protected httpLoaderService:HttpLoaderService,
                protected httpErrorHandlerService:HttpErrorHandlerService) {
        super(http, httpLoaderService, httpErrorHandlerService);
    }

    @GET('trending')
    @Produces(MediaType.JSON)
    public get(@Query('limit') limit?:number):Observable<any> {
        return null;
    }

}