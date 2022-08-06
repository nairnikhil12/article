import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppSettings } from '../config/app-settings';

const jwtHelper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseURI: string = AppSettings.API_ENDPOINT;

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
        const token = localStorage.getItem('token');
        if (!token)
            return false;

        // Remove the token if it has expired
        if (jwtHelper.isTokenExpired(token)) {
            localStorage.removeItem('token');
            return false;
        }

        return true;
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }
}
