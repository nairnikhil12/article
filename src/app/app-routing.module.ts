import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateArticleComponent } from './components/create-article/create-article.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent },
    { path: 'create', component: CreateArticleComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
