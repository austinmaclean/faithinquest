import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {
    GET, PUT, POST,
    DELETE, BaseUrl, Headers,
    Produces, MediaType, DefaultHeaders,
    Path, Body, Query, QueryObject
} from './rest-client';
import {Study} from '../model/study';
import {BaseService} from './base.service';
import {HttpLoaderService} from '../http-loader/httpLoaderService';
import {HttpErrorHandlerService} from '../http-error-handler/httpErrorHandlerService';

@Injectable()
@BaseUrl('/api/')
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
export class StudyService extends BaseService {

    constructor(protected http:Http,
                protected httpLoaderService:HttpLoaderService,
                protected httpErrorHandlerService:HttpErrorHandlerService) {
        super(http, httpLoaderService, httpErrorHandlerService);
    }

    @GET('study')
    @Produces(MediaType.JSON)
    public get(@Query('limit') limit?:number,
               @Query('offset') offset?:number,
               @Query('order') order?:string,
               @Query('sort') sort?:string):Observable<any> {
        return null;
    }

    @GET('study/find')
    @Produces(MediaType.JSON)
    public find(@QueryObject search:any):Observable<any> {
        return null;
    }

    @GET('study/{id}')
    @Produces(MediaType.JSON)
    public read(@Path("id") id:string):Observable<any> {
        return null;
    }

    @PUT('admin/study/views/{id}')
    @Produces(MediaType.JSON)
    public updateviews(@Path("id") id:string):Observable<any> {
        return null;
    }

    @POST('admin/study')
    @Produces(MediaType.JSON)
    public create(@Body study:Study):Observable<any> {
        return null;
    }

    @PUT('admin/study')
    @Produces(MediaType.JSON)
    public update(@Body study:Study):Observable<any> {
        return null;
    }

    @DELETE("admin/study/{id}")
    @Produces(MediaType.JSON)
    public remove(@Path("id") id:string):Observable<Response> {
        return null;
    }

}
