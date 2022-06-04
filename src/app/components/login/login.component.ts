import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isUsernameValid: boolean = true;
    isPasswordValid: boolean = true;
    errorMessage = { username: '', password: '' };
    username: string = "";
    password: string = "";

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    onLogin(): void {
        const user: UserLogin = {
            username: this.username,
            password: this.password
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
                    this.isPasswordValid = true;
                    this.isUsernameValid = false;
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
            }
        });
    }
}
