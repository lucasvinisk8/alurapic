import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlataformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';


@Component({
    templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {

    fromUrl: string;
    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private plataformDetectorService: PlataformDetectorService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute
            .queryParams
            .subscribe(params => this.fromUrl = params.fromUrl);
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.plataformDetectorService.isPlataformBrowser() &&
            this.userNameInput.nativeElement.focus();
    }

    login() {
        console.log('vai se autenticar');

        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => {
                    if (this.fromUrl) {
                        this.router.navigateByUrl(this.fromUrl);
                    } else {
                        this.router.navigate(['user', userName])
                    }
                }
                ,
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    this.plataformDetectorService.isPlataformBrowser() &&
                        this.userNameInput.nativeElement.focus();
                    alert('invalid user name or password');
                });
    }
}