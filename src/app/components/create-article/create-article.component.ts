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
        height: '25rem',
        minHeight: '25rem',
        maxHeight: '25rem',
        placeholder: 'Type your article here...',
        toolbarHiddenButtons: [[
            'insertImage',
            'insertVideo'
        ]]
    };

    constructor() { }

    ngOnInit(): void {
    }

}
