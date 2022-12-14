import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ViewArticleComponent } from './components/view-article/view-article.component';

import { ArticleService } from './services/article.service';
import { RegisterService } from './services/register.service';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ArticleDisplayCardComponent } from './components/article-display-card/article-display-card.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CreateArticleComponent,
        HeaderComponent,
        RegisterComponent,
        LoginComponent,
        ViewArticleComponent,
        ArticleDisplayCardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularEditorModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule
    ],
    providers: [
        ArticleService,
        RegisterService,
        AuthService,
        JwtHelperService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
