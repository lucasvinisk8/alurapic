import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuad implements CanActivate {

    constructor(private userService: UserService,
        private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        if (!this.userService.isLoggerd()) {
            this.router.navigate(
                [''],
                {
                    queryParams: {
                        fromUrl: state.url
                    }
                }
            );
            return false;
        }
        return true;
    }
}

