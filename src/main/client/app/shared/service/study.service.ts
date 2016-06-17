import {Injectable} from '@angular/core';
import {Http, Response, Request} from '@angular/http';
import {Router} from '@angular/router-deprecated';
import {Observable} from 'rxjs/Observable';
import {Study} from '../model/study';
import {BaseService} from './base.service';
import {
    GET, PUT, POST,
    DELETE, BaseUrl, Headers,
    Produces, MediaType, DefaultHeaders,
    Path, Body, Query
} from './rest-client';
import 'rxjs/add/operator/map';

@Injectable()
@BaseUrl('/api/')
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
export class StudyService extends BaseService {

    constructor(protected router:Router, protected http:Http) {
        super(router, http);
    }

    @GET('study')
    @Produces(MediaType.JSON)
    public get(@Query('limit') limit?:number,
               @Query('offset') offset?:number,
               @Query('order') order?:string,
               @Query('sort') sort?:string):Observable<Study[]> {
        return null;
    }

    @GET('study/find')
    @Produces(MediaType.JSON)
    public find(@Query('pattern') pattern?:string,
                @Query('speaker') speaker?:string,
                @Query('limit') limit?:number,
                @Query('offset') offset?:number,
                @Query('order') order?:string,
                @Query('sort') sort?:string):Observable<Study[]> {
        return null;
    }

    @GET('study/{id}')
    @Produces(MediaType.JSON)
    public read(@Path("id") id:string):Observable<Study> {
        return null;
    }

    @POST('admin/study')
    @Produces(MediaType.JSON)
    public create(@Body study:Study):Observable<Study> {
        return null;
    }

    @PUT('admin/study')
    @Produces(MediaType.JSON)
    public update(@Body study:Study):Observable<Study> {
        return null;
    }

    @DELETE("admin/study/{id}")
    @Produces(MediaType.JSON)
    public remove(@Path("id") id:string):Observable<Response> {
        return null;
    }

}
