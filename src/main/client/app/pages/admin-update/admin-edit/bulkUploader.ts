import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export class BulkUploader extends FileUploader {

    private _successHandler:Subject<string>;
    private _errorHandler:Subject<string>;

    constructor(options:any) {
        super(options);

        this._successHandler = <Subject<string>>new Subject();
        this._errorHandler = <Subject<string>>new Subject();
    };

    public get successHandler():Observable<string> {
        return this._successHandler.asObservable();
    }

    public get errorHandler():Observable<string> {
        return this._errorHandler.asObservable();
    }

    onSuccessItem(item:any, response:any, status:any, headers:any):any {
        this._successHandler.next(item.file.name);
        return super.onSuccessItem(item, response, status, headers);
    };

    onErrorItem(item:any, response:any, status:any, headers:any):any {
        this._errorHandler.next(item.file.name);
        return super.onErrorItem(item, response, status, headers);
    };

}