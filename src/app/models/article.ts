export class Article {
    id!: string;
    title!: string;
    content!: string;
    userId!: string;
    createdAt!: string;
    updateAt!: string;
}

export class ArticlePublish {
    title!: string;
    subtitle!: string;
    content!: string;
}
