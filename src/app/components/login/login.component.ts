import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { UserLogin } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup = new FormGroup({});
    isUsernameValid: boolean = true;
    isPasswordValid: boolean = true;
    errorMessage = { username: '', password: '' };

    constructor(
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            username: [null, [Validators.required, (control: any) => { return ValidateUsername(this.isUsernameValid) }]],
            password: [null, [Validators.required, (control: any) => { return ValidatePassword(this.isPasswordValid) }]]
        });

        this.form.get('username')?.valueChanges.subscribe(change => {
            this.isUsernameValid = true;
            this.form.updateValueAndValidity();
        });

        this.form.get('password')?.valueChanges.subscribe(change => {
            this.isPasswordValid = true;
            this.form.updateValueAndValidity();
        });
    }

    onLogin(form: any): void {
        const user: UserLogin = {
            username: form.value.username,
            password: form.value.password
        }

        this.authService.login(user).subscribe({
            next: (data) => {
                console.log(data);
                localStorage.setItem('token', data.accessToken);
                this.router.navigate(['/home']);
            },
            error: (err) => {
                console.log(err);

                const code = err.error.error_code;
                const message = err.error.message;

                if (code === 'LOGIN001' || code === 'LOGIN002') {
                    this.isUsernameValid = false;
                    this.isPasswordValid = true;
                    this.errorMessage.username = message;
                }
                else if (code === 'LOGIN003') {
                    this.isUsernameValid = true;
                    this.isPasswordValid = false;
                    this.errorMessage.password = message;
                }
                else {
                    this.isUsernameValid = true;
                    this.isPasswordValid = false;
                    this.errorMessage.password = message;
                }

                this.form.get('username')?.updateValueAndValidity();
                this.form.get('password')?.updateValueAndValidity();
            }
        });
    }
}

function ValidateUsername(isUsernameValid: boolean): { [key: string]: any } | null {
    if (!isUsernameValid) {
        return { 'usernameInvalid': true };
    }
    return null;
}

function ValidatePassword(isPasswordValid: boolean): { [key: string]: any } | null {
    if (!isPasswordValid) {
        return { 'passwordInvalid': true };
    }
    return null;
}
