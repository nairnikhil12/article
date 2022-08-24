import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/models/user';
import { RegisterService } from 'src/app/services/register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: FormGroup = new FormGroup({});
    isFirstnameValid: boolean = true;
    isLastnameValid: boolean = true;
    isUsernameValid: boolean = true;
    isPasswordValid: boolean = true;
    errorMessages: any = {};

    constructor(
        private registerService: RegisterService,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            firstname: [null, [Validators.required, (control: any) => { return ValidateFirstname(this.isFirstnameValid) }]],
            lastname: [null, [Validators.required, (control: any) => { return ValidateLastname(this.isLastnameValid) }]],
            username: [null, [Validators.required, (control: any) => { return ValidateUsername(this.isUsernameValid) }]],
            password: [null, [Validators.required, (control: any) => { return ValidatePassword(this.isPasswordValid) }]]
        });

        this.form.get('firstname')?.valueChanges.subscribe(change => {
            this.isFirstnameValid = true;
            this.form.updateValueAndValidity();
        });

        this.form.get('lastname')?.valueChanges.subscribe(change => {
            this.isLastnameValid = true;
            this.form.updateValueAndValidity();
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

    onRegister(form: any): void {
        const user: UserRegister = {
            firstname: form.value.firstname,
            lastname: form.value.lastname,
            username: form.value.username,
            password: form.value.password
        }

        this.registerService.registerUser(user).subscribe({
            next: (data) => {
                console.log(data);
                this.router.navigate(['/login']);
            },
            error: (err) => {
                console.log(err);

                const code = err.error.error_code;
                const message = err.error.message;

                if (code === 'REGISTER001') {
                    this.errorMessages = { firstname: message };
                    this.isFirstnameValid = false;
                }
                else if (code === 'REGISTER002') {
                    this.errorMessages = { lastname: message };
                    this.isLastnameValid = false;
                }
                else if (code === 'REGISTER003' || code === 'REGISTER006') {
                    this.errorMessages = { username: message };
                    this.isUsernameValid = false;
                }
                else if (code === 'REGISTER004') {
                    this.errorMessages = { password: message };
                    this.isPasswordValid = false;
                }
                else {
                    this.errorMessages = { password: message };
                    this.isPasswordValid = false;
                }

                this.form.get('firstname')?.updateValueAndValidity();
                this.form.get('lastname')?.updateValueAndValidity();
                this.form.get('username')?.updateValueAndValidity();
                this.form.get('password')?.updateValueAndValidity();
            }
        });
    }
}

function ValidateFirstname(isFirstnameValid: boolean): { [key: string]: any } | null {
    if (!isFirstnameValid) {
        return { 'firstnameInvalid': true };
    }
    return null;
}

function ValidateLastname(isLastnameValid: boolean): { [key: string]: any } | null {
    if (!isLastnameValid) {
        return { 'lastnameInvalid': true };
    }
    return null;
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
