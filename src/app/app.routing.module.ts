import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostsaddComponent } from './postsadd/postsadd.component';
import { LoggedInGuard } from './service/canactive.service';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { UserpostComponent } from './userpost/userpost.component';
import { FavoritePostComponent } from './favorite/favorite.component';
// This Routing Module is the Root Routing Module
export const appRoute: Routes = [
    { path: '', redirectTo: '/viewbooks', pathMatch: 'full', canActivate: [LoggedInGuard] },
    { path: 'viewbooks', component: PostsComponent, canActivate: [LoggedInGuard]},
    { path: 'add', component: PostsaddComponent, canActivate: [LoggedInGuard] },
    { path: 'book', component: PostComponent, canActivate: [LoggedInGuard] },
    { path: 'userposts', component: UserpostComponent },
    { path: 'login', component: LoginComponent},
    { path: 'favorite', component: FavoritePostComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule],
})

export class AppRoutingModule { }

