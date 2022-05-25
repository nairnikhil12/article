import { Component, OnInit } from '@angular/core';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'app-create-article',
    templateUrl: './create-article.component.html',
    styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

    htmlContent = '';

    config: AngularEditorConfig = {
        editable: true,
        spellcheck: false,
        height: '40rem',
    };

    constructor() { }

    ngOnInit(): void {
    }

}
