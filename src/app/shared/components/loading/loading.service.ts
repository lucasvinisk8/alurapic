import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { startWith } from "rxjs/operators";
import { LoadingType } from "./loading-type";

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    loadingSubjec = new Subject<LoadingType>();

    getLoading() {
        return this.loadingSubjec
            .asObservable()
            .pipe(startWith(LoadingType.STOPPED));
    }

    start() {
        this.loadingSubjec.next(LoadingType.LOADING);
    }

    stop() {
        this.loadingSubjec.next(LoadingType.STOPPED);
    }
}