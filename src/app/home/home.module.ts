import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { SignUpComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignupService } from './signup/signup.service';

@NgModule({
    declarations: [ 
        SigninComponent,
        SignUpComponent,
        HomeComponent
    ],
    imports: [ 
         CommonModule
        ,FormsModule
        ,ReactiveFormsModule 
        ,VMessageModule
        ,RouterModule
        ,HomeRoutingModule
    
    ],
    providers: [ SignupService ]
})

export class HomeModule {}