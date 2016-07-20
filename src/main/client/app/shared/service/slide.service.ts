import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
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
export class SlideService extends BaseService {

    constructor(protected http:Http,
                protected httpLoaderService:HttpLoaderService,
                protected httpErrorHandlerService:HttpErrorHandlerService) {
        super(http, httpLoaderService, httpErrorHandlerService);
    }

    static attachURL(attach):string {
        if (attach.path) {
            var search = new URLSearchParams();
            search.set('path', attach.path);
            search.set('fileName', attach.fileName);
            search.set('contentType', attach.contentType);
            return '/api/admin/attach?' + search.toString();
        } else {
            return '/api/attach/' + attach.id;
        }
    };

    @GET('slide')
    @Produces(MediaType.JSON)
    public get(@Query('limit') limit?:number,
               @Query('offset') offset?:number,
               @Query('order') order?:string,
               @Query('sort') sort?:string):Observable<any> {
        return null;
    }

    @GET('slide/{id}')
    @Produces(MediaType.JSON)
    public read(@Path("id") id:string):Observable<any> {
        return null;
    }

    @POST('admin/slide')
    @Produces(MediaType.JSON)
    public create(@Body slide:any):Observable<any> {
        return null;
    }

    @PUT('admin/slide')
    @Produces(MediaType.JSON)
    public update(@Body slide:any):Observable<any> {
        return null;
    }

    @DELETE("admin/slide/{id}")
    @Produces(MediaType.JSON)
    public remove(@Path("id") id:string):Observable<Response> {
        return null;
    }

}
