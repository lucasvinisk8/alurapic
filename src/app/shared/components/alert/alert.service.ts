import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Subject } from "rxjs";
import { Alert, AlertType } from "./alert";

@Injectable({ providedIn: 'root' })
export class AlertService {

    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepAfertRouterChange = false;

    constructor(router: Router) {

        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfertRouterChange) {
                    this.keepAfertRouterChange = false;
                } else {
                    this.clear();
                }
            }
        })
    }

    success(message: string, keepAfertRouterChange: boolean = false) {
        this.alert(AlertType.SUCCESS, message, keepAfertRouterChange);
    }

    warning(message: string, keepAfertRouterChange: boolean = false) {
        this.alert(AlertType.WARNING, message, keepAfertRouterChange);
    }

    danger(message: string, keepAfertRouterChange: boolean = false) {
        this.alert(AlertType.DANGER, message, keepAfertRouterChange);
    }

    info(message: string, keepAfertRouterChange: boolean = false) {
        this.alert(AlertType.INFO, message, keepAfertRouterChange);
    }

    alert(alertType: AlertType, message: string, keepAfertRouterChange: boolean) {
        this.keepAfertRouterChange = keepAfertRouterChange;
        this.alertSubject.next(new Alert(alertType, message));
    }

    getAlert() {
        return this.alertSubject.asObservable();
    }

    clear() {
        this.alertSubject.next(null);
    }
}