import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    baseURI: string = 'http://127.0.0.1:8081/api/v1';

    constructor(private http: HttpClient) { }

    loginUser(user: UserLogin): Observable<any> {
        let uri = `${this.baseURI}/auth/login`

        return this.http.post(uri, user);
    }
}
