import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
    selector: 'app-create-article',
    templateUrl: './create-article.component.html',
    styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

    title: string = '';
    htmlContent: string = '';

    config: AngularEditorConfig = {
        editable: true,
        spellcheck: false,
        height: '25rem',
        minHeight: '25rem',
        maxHeight: '25rem',
        placeholder: 'Type your article here...',
        toolbarHiddenButtons: [[
            'insertImage',
            'insertVideo'
        ]]
    };

    ngOnInit(): void { }

    constructor(
        private articleService: ArticleService,
        private router: Router
    ) { }

    onPublish(): void {
        const article: Article = {
            title: this.title,
            content: this.htmlContent
        };

        this.articleService.publishArticle(article).subscribe(data => {
            console.log(data);
        });
    }

    onDiscard(): void {
        this.router.navigate(['/home']);
    }
}
