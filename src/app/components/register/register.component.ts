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

        this.registerService.registerUser(user).subscribe(data => {
            console.log(data);
            this.router.navigate(['/home']);
        });
    }
}
