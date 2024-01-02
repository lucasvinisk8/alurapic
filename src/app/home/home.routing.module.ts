import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuad } from '../core/auth/login.guard';
import { HomeComponent } from './home.component';
import { SigninComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';


const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
        canActivate: [LoginGuad],
        children: [
            {
                path: '',
                component: SigninComponent,
                data: {
                    title: 'Sign in'
                }
            },

            {
                path: 'signup',
                component: SignUpComponent,
                data: {
                    title: 'Sign up'
                }
            },
        ]
    },


];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule { }

