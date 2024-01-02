import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';


@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    user$: Observable<User>;


    constructor(
        private userSerivice: UserService,
        private router: Router) {
        this.user$ = userSerivice.getUser();
    }

    logout() {
        this.userSerivice.logout();
        this.router.navigate(['']);
    }
}