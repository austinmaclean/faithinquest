import {FileUploader} from 'ng2-file-upload/ng2-file-upload';

export class BulkUploader extends FileUploader {
    constructor(options:any, private onSuccess:Function, private onError:Function) {
        super(options);
    };

    onSuccessItem(item:any, response:any, status:any, headers:any):any {
        setTimeout(() => this.onSuccess(item.file.name), 0);
        return super.onSuccessItem(item, response, status, headers);
    };

    onErrorItem(item:any, response:any, status:any, headers:any):any {
        setTimeout(() => this.onError(item.file.name), 0);
        return super.onErrorItem(item, response, status, headers);
    };
}