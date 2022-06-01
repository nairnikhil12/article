import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article, ArticlePublish } from '../models/article';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    baseURI: string = 'http://127.0.0.1:8081/api/v1';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    publishArticle(article: ArticlePublish): Observable<any> {
        const uri: string = `${this.baseURI}/article`;

        const options = {
            headers: {
                'x-access-token': this.authService.getSession()
            }
        }

        return this.http.post(uri, article, options);
    }

    retrieveArticleById(id: string): Observable<Article> {
        const uri: string = `${this.baseURI}/article/id/${id}`;

        return this.http.get<Article>(uri);
    }

    retrieveAllArticles(): Observable<Article[]> {
        const uri: string = `${this.baseURI}/article/all`;

        return this.http.get<Article[]>(uri);
    }
}
