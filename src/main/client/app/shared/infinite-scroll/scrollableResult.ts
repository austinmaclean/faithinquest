import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

interface IScrollableResult<T> {
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
    addComparable(item:T, comparatorFunction:Function, comparatorTypeDesc:boolean, call?:Function);
}

@Injectable()
export class ScrollableResult<T> implements IScrollableResult, OnInit {

    private items:T[];
    private itemsReversed:T[];
    private busy:boolean;
    private hasMore:boolean;
    private totalCount:number;
    private itemsCount:number;
    private externalItemsCount:number;

    constructor(private resource?:Observable,
                private holderId?:string,
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

    ngOnInit():any {
        console.log('init');
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

        var requestData = {
            limit: this.limit,
            offset: (this.itemsCount - this.externalItemsCount)
        };

        if (this.holderId) {
            requestData['id'] = this.holderId;
        }

        if (this.filter) {
            this.filter.forEach(function (item) {
                requestData[item.key] = item.value;
            });
        }

        //this.resource(requestData, (res) => {
        //    this.totalCount = res.count;
        //    var items = res.result;
        //    var i, j;
        //
        //    if (this.checkDuplicate) {
        //
        //        var exists;
        //        for (i = 0; i < items.length; i++) {
        //            exists = false;
        //            for (j = 0; j < this.items.length; j++) {
        //                if (items[i].id === this.items[j].id) {
        //                    exists = true;
        //                    break;
        //                }
        //            }
        //            if (!exists) {
        //                this.items.push(items[i]);
        //            }
        //        }
        //
        //    } else {
        //
        //        for (i = 0; i < items.length; i++) {
        //            this.items.push(items[i]);
        //        }
        //
        //    }
        //
        //    this.itemsCount += items.length;
        //
        //    this.hasMore = res.result.length > 0;
        //
        //    this._refreshReversed();
        //
        //    if (call) {
        //        call(items);
        //    }
        //
        //    this.busy = false;
        //
        //    if (postCall) {
        //        postCall(items);
        //    }
        //});
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

    /**
     * DESC Comparator Function Example:
     *
     * var descComparatorFunctionExample = function(newItem, existItem) {
     *      if (newItem.date > existItem.date) {
     *          return 1; // add item
     *      } else if (newItem.date === existItem.date) {
     *          // check duplicate
     *          if (newItem.id === existItem.id) {
     *              return 0; // this item already added (ignore this item)
     *          } else {
     *              return 1; // add item
     *          }
     *      } else {
     *          return -1; // next iteration if it is possible or add as last
     *      }
     *  }
     *
     *  Call 'addComparable' Example:
     *
     *  scrollableResult.addComparable(newItemObject, descComparatorFunctionExample, true, null);
     *
     */

    _comparator(newItem, existOldItemKey, existItemKey, existNextItemKey, comparatorFunction, comparatorTypeDesc) {
        var index = null,
            existOldItem = null,
            existItem = null,
            existNextItem = null,
            comparatorValue = null;

        if (existOldItemKey == null && existNextItemKey == null) {
            // existItem - is a single value
            existItem = this.items[existItemKey];

            if (comparatorTypeDesc) {
                comparatorValue = comparatorFunction(newItem, existItem);
                if (comparatorValue === 0) {
                    return -1; // item is duplicate
                }

                if (comparatorValue === 1) {
                    // add new item as first
                    index = 0;
                } else {
                    // add new item as last
                    index = 1;
                }
            } else {
                // TODO - ASC not implemented
            }
        } else if (existOldItemKey == null) {
            // existItem - is first
            existItem = this.items[existItemKey];
            existNextItem = this.items[existNextItemKey];

            if (comparatorTypeDesc) {
                comparatorValue = comparatorFunction(newItem, existItem);
                if (comparatorValue === 0) {
                    return -1; // item is duplicate
                }

                if (comparatorValue === 1) {
                    // add new item as first
                    index = 0;
                }
            } else {
                // TODO - ASC not implemented
            }
        } else if (existNextItemKey) {
            // existItem - is last
            existOldItem = this.items[existOldItemKey];
            existItem = this.items[existItemKey];

            if (comparatorTypeDesc) {
                comparatorValue = comparatorFunction(newItem, existItem);
                if (comparatorValue === 0) {
                    return -1; // item is duplicate
                }

                if (comparatorValue === 1) {
                    index = existItemKey;
                } else {
                    // add new item as last
                    index = existItemKey + 1;
                }
            } else {
                // TODO - ASC not implemented
            }
        } else {
            existOldItem = this.items[existOldItemKey];
            existItem = this.items[existItemKey];
            existNextItem = this.items[existNextItemKey];

            if (comparatorTypeDesc) {
                comparatorValue = comparatorFunction(newItem, existItem);
                if (comparatorValue === 0) {
                    return -1; // item is duplicate
                }

                if (comparatorValue === 1) {
                    index = existItemKey;
                }
            } else {
                // TODO - ASC not implemented
            }
        }
        return index;
    };

    addComparable(item:T, comparatorFunction:Function, comparatorTypeDesc:boolean, call?:Function) {
        if (this.items.length === 0) {
            // Is empty (set as first)
            this.items.unshift(item);
        } else {
            var key = null;
            for (var index = this.externalItemsCount; index < this.items.length; index++) {
                key = this._comparator(item,
                    index === 0 ? null : (index - 1 ), index, ((index + 1) === this.items.length) ? null : (index + 1 ),
                    comparatorFunction, comparatorTypeDesc);

                if (key !== null) {
                    if (key === -1) {
                        // duplicate ( totalCount not incremented and 'call' function will not be called )
                        return;
                    } else if (key === 0) {
                        // add as first
                        this.items.unshift(item);
                    } else if (key === this.items.length) {
                        // add as last
                        this.items.push(item);
                    } else {
                        // add
                        this.items.splice(key, 0, item);
                    }
                    break;
                }
            }
        }

        this.totalCount++;

        this._refreshReversed();

        if (call) {
            call();
        }
    };

}