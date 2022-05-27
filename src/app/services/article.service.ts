import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    baseURI: string = 'http://127.0.0.1:8081/api/v1';

    constructor(private http: HttpClient) { }

    publishArticle(article: Article): Observable<any> {
        let uri = `${this.baseURI}/article/`;

        return this.http.post(uri, article);
    }
}
