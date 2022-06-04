import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/models/user';
import { RegisterService } from 'src/app/services/register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    firstname: string = '';
    lastname: string = '';
    username: string = '';
    password: string = '';

    errorMessages: any = {};

    constructor(
        private registerService: RegisterService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    onRegister(): void {
        const user: UserRegister = {
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            password: this.password
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
                    this.errorMessages = { 'firstname': message };
                }
                else if (code === 'REGISTER002') {
                    this.errorMessages = { 'lastname': message };
                }
                else if (code === 'REGISTER003' || code === 'REGISTER006') {
                    this.errorMessages = { 'username': message };
                }
                else if (code === 'REGISTER004') {
                    this.errorMessages = { 'password': message };
                }
                else {
                    this.errorMessages = { 'password': message };
                }
            }
        });
    }
}
