import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { HeaderComponent } from './components/header/header.component';

import { ArticleService } from './services/article.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CreateArticleComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularEditorModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        ArticleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
