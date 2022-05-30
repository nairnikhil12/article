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

        this.authService.login(user).subscribe(data => {
            console.log(data);
            localStorage.setItem('token', data.accessToken);
            this.router.navigate(['/home']);
        });
    }
}
