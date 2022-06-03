import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister } from '../models/user';
import { AppSettings } from '../config/app-settings';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    baseURI: string = AppSettings.API_ENDPOINT;

    constructor(private http: HttpClient) { }

    registerUser(user: UserRegister): Observable<any> {
        let uri = `${this.baseURI}/auth/register`

        return this.http.post(uri, user);
    }
}
