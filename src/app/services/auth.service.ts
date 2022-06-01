import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseURI: string = 'http://127.0.0.1:8081/api/v1';

    constructor(private http: HttpClient) { }

    login(user: UserLogin): Observable<any> {
        let uri = `${this.baseURI}/auth/login`

        return this.http.post<UserLogin>(uri, user);
    }

    setSession(token: string): void {
        localStorage.setItem('token', token);
    }

    getSession(): string {
        return localStorage.getItem('token') || '';
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }
}
