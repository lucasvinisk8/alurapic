import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { PlataformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';
import { userNamePassword } from './username-password.validator';


@Component({
    templateUrl: './signup.component.html',
    providers: [UserNotTakenValidatorService]
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signupService: SignupService,
        private router: Router,
        private plataformDetectorService: PlataformDetectorService) { }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]],
            userName: ['',
                [
                    Validators.required,
                    lowerCaseValidator,
                    // Validators.pattern(/^[a-z0-9_\-]+$/),
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ],
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ]],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]]
        },
            {
                validator: userNamePassword
            }
        );
        this.plataformDetectorService.isPlataformBrowser() &&
            this.emailInput.nativeElement.focus();
    }

    signup() {
        if (this.signupForm.valid && !this.signupForm.pending) {
            const newUser = this.signupForm.getRawValue() as NewUser;
            this.signupService
                .signup(newUser)
                .subscribe(
                    () => this.router.navigate(['']),
                    err => console.log(err)
                );
        }
    }
}