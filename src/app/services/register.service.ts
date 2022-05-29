import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    baseURI: string = 'http://127.0.0.1:8081/api/v1';

    constructor(private http: HttpClient) { }

    registerUser(user: UserRegister): Observable<any> {
        let uri = `${this.baseURI}/auth/register`

        return this.http.post(uri, user);
    }
}
