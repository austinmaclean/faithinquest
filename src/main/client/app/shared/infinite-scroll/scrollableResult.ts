import {BaseModel} from "../model/baseModel";
import {StudyService} from "../service/study.service";

interface IScrollableResult<T extends BaseModel> {
    getItems():T[];
    stop();
    hasNext():boolean;
    next(call?:Function, postCall?:Function);
    readAll(call:Function);
    addExternalFirs(item:T, call?:Function);
    addFirs(item:T, call?:Function);
    updateItemField(item:T, fieldName:string, call?:Function);
    update(item:T, call?:Function);
    remove(item:T, call?:Function);
    clearInternal(call?:Function, nextCall?:Function, nextPostCall?:Function);
    updateFilter(filter:any[], call?:Function, nextCall?:Function, nextPostCall?:Function);
    getTotal():number;
}

export class ScrollableResult<T extends BaseModel> implements IScrollableResult<T> {

    private items:T[];
    private itemsReversed:T[];
    private busy:boolean;
    private hasMore:boolean;
    private totalCount:number;
    private itemsCount:number;
    private externalItemsCount:number;

    constructor(private resource:StudyService,
                private limit?:number,
                private filter?:any[],
                private checkDuplicate?:boolean,
                private reversEnable?:boolean) {

        this.items = [];
        this.busy = false;
        this.hasMore = true;
        this.totalCount = 0;
        this.itemsCount = 0;
        this.externalItemsCount = 0;

        if (reversEnable) {
            this.itemsReversed = [];
        }
    }

    getItems():T[] {
        if (this.reversEnable) {
            return this.itemsReversed;
        } else {
            return this.items;
        }
    }

    private _refreshReversed() {
        if (this.reversEnable) {
            this.itemsReversed = this.items.slice().reverse();
        }
    };

    public stop():void {
        this.hasMore = false;
    };

    public hasNext():boolean {
        return !this.busy && this.hasMore;
    };

    public next(call?:Function, postCall?:Function) {
        if (this.busy || !this.hasMore) {
            return;
        }
        this.busy = true;

        let requestData = {
            limit: this.limit,
            offset: (this.itemsCount - this.externalItemsCount),
            pattern: null,
            speaker: null
        };

        if (this.filter) {
            this.filter.forEach(function (item) {
                requestData[item.key] = item.value;
            });
        }

        this.resource.find(requestData.pattern, requestData.speaker, requestData.limit, requestData.offset, null, null).subscribe((res) => {

            this.totalCount = res.count;

            var items = res.result;
            var i, j;

            if (this.checkDuplicate) {

                var exists;
                for (i = 0; i < items.length; i++) {
                    exists = false;
                    for (j = 0; j < this.items.length; j++) {
                        if (items[i].id === this.items[j].id) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        this.items.push(items[i]);
                    }
                }

            } else {

                for (i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }

            }

            this.itemsCount += items.length;

            this.hasMore = res.result.length > 0;

            this._refreshReversed();

            if (call) {
                call(items);
            }

            this.busy = false;

            if (postCall) {
                postCall(items);
            }
        });
    }

    _readAll(call) {
        if (this.hasMore) {
            this.next(null, function () {
                this._readAll(call)
            });
        } else {
            call();
        }
    };

    public readAll(call:Function) {
        this._readAll(call)
    };

    public addExternalFirs(item:T, call?:Function) {
        this.items.unshift(item);
        this.externalItemsCount++;

        this._refreshReversed();

        if (call) {
            call();
        }
    };

    public addFirs(item:T, call?:Function) {
        this.items.unshift(item);
        this.totalCount++;

        this._refreshReversed();

        if (call) {
            call();
        }
    };

    updateItemField(item:T, fieldName:string, call?:Function) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                this.items[i][fieldName] = item[fieldName];
                break;
            }
        }

        this._refreshReversed();

        if (call) {
            call();
        }
    };

    update(item:T, call?:Function) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                this.items[i] = item;
                break;
            }
        }

        this._refreshReversed();

        if (call) {
            call();
        }
    };

    remove(item:T, call?:Function) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                this.items.splice(i, 1);
                this.itemsCount--;
                this.totalCount--;
                break;
            }
        }

        this._refreshReversed();

        if (call) {
            call();
        }
    };

    clearAll(call?:Function) {
        var self = this;

        var handler = function () {
            self.clearAll(call);
        };

        if (this.busy) {
            setTimeout(handler, 500);
        } else {
            this.items = [];
            this.itemsCount = 0;
            this.totalCount = 0;
            this.hasMore = true;
            this.externalItemsCount = 0;

            this._refreshReversed();

            if (call) {
                call();
            }
        }
    };

    clearInternal(call?:Function, nextCall?:Function, nextPostCall?:Function) {
        var self = this;

        var handler = function () {
            self.clearAll(call);
        };

        if (this.busy) {
            setTimeout(handler, 500);
        } else {
            this.items = this.items.slice(0, this.externalItemsCount);
            this.itemsCount = 0;
            this.hasMore = true;
            this.next(nextCall, nextPostCall);

            this._refreshReversed();

            if (call) {
                call();
            }
        }
    };

    updateFilter(filter:any[], call?:Function, nextCall?:Function, nextPostCall?:Function) {
        this.filter = filter;
        this.clearInternal(call, nextCall, nextPostCall);
    };

    getTotal():number {
        return this.totalCount + this.externalItemsCount;
    };

}