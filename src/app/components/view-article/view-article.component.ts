import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'app-view-article',
    templateUrl: './view-article.component.html',
    styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
    id: string = '';
    article: Article = new Article;

    config: AngularEditorConfig = {
        editable: false,
        showToolbar: false,
        height: '25rem',
        minHeight: '25rem',
        maxHeight: '25rem',
        outline: false
    };

    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id') || '';

        this.articleService.retrieveArticleById(this.id).subscribe(data => {
            this.article = data;
            console.log(this.article);
        });
    }

}
