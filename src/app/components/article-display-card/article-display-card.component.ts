import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-article-display-card',
    templateUrl: './article-display-card.component.html',
    styleUrls: ['./article-display-card.component.css']
})
export class ArticleDisplayCardComponent implements OnInit {
    @Input() article: any = {};

    publishing_date: string = '';

    constructor() { }

    ngOnInit(): void {
        const date = new Date(this.article.createdAt);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        this.publishing_date = `${day} ${month} ${year}`;
    }
}
