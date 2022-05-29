import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: string = "";
    password: string = "";

    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    onLogin(): void {
        const user: UserLogin = {
            username: this.username,
            password: this.password
        }

        this.loginService.loginUser(user).subscribe(data => {
            console.log(data);
            this.router.navigate(['/home']);
        });
    }
}
