import {FileUploader} from "ng2-file-upload/ng2-file-upload";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

export interface UploadData {
    fileName:string;
    attachment?:any
    error?:any
}

export class FileUploadProvider extends FileUploader {

    private _successHandler:Subject<UploadData>;
    private _errorHandler:Subject<UploadData>;
    private _beforeUploadHandler:Subject<any>;
    private _progressHandler:Subject<any>;

    constructor(options:any) {
        super(options);

        this._successHandler = <Subject<any>>new Subject();
        this._errorHandler = <Subject<any>>new Subject();
        this._beforeUploadHandler = <Subject<any>>new Subject();
        this._progressHandler = <Subject<any>>new Subject();
    };

    public get successHandler():Observable<UploadData> {
        return this._successHandler.asObservable();
    }

    public get errorHandler():Observable<UploadData> {
        return this._errorHandler.asObservable();
    }

    public get beforeUploadHandler():Observable<any> {
        return this._beforeUploadHandler.asObservable();
    }

    public get progressHandler():Observable<any> {
        return this._progressHandler.asObservable();
    }

    onSuccessItem(item:any, response:any, status:any, headers:any):any {
        this._successHandler.next(<UploadData>{
            fileName: item.file.name,
            attachment: JSON.parse(response)
        });
        return super.onSuccessItem(item, response, status, headers);
    };

    onErrorItem(item:any, response:any, status:any, headers:any):any {
        this._errorHandler.next(<UploadData>{
            fileName: item.file.name,
            error: JSON.parse(response)
        });
        return super.onErrorItem(item, response, status, headers);
    };


    onBeforeUploadItem(fileItem: any): any {
        this._beforeUploadHandler.next(<any>{
            fileItem: fileItem
        });
        return super.onBeforeUploadItem(fileItem);
    }

    onProgressItem(fileItem: any, progress: any): any {
        this._progressHandler.next(<any>{
            progress: progress
        });
        return super.onProgressItem(fileItem, progress);
    }



}