import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatFormField,
  MatInput, MatInputModule, MatCardModule, MatListModule, MatSelectModule
} from '@angular/material';
import { PostsService } from './service/posts.service';
import { AppComponent } from './app.component';

import { PostsComponent } from './posts/posts.component';
import { AppRoutingModule } from './app.routing.module';

import { PostsaddComponent } from './postsadd/postsadd.component';
import { StarRatingModule } from 'angular-star-rating';
import { LoginComponent } from './login/login.component';

import { LoggedInGuard } from './service/canactive.service';
import { PostComponent } from './post/post.component';

import { SearchByNameFilter } from './pipes/namefilter-pipe';
import { SortByFilter } from './pipes/sortby-pipe';
import { CategoryByNameFilter } from './pipes/categoryfilter-pipe';

import { SocialLoginModule, AuthServiceConfig, SocialUser  } from 'angular4-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';
import { UserpostComponent } from './userpost/userpost.component';
import { AppHeaderComponent } from './shared/appheader/appheader.component';
import { FavoritePostComponent } from './favorite/favorite.component';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('695376377980-rov4phuo3qduqsbntumvgisavsfvkj6d.apps.googleusercontent.com')
  }
]);


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostsaddComponent,
    LoginComponent,
    PostComponent,
    SearchByNameFilter,
    SortByFilter,
    CategoryByNameFilter,
    UserpostComponent,
    AppHeaderComponent,
    FavoritePostComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    StarRatingModule.forRoot(),
    SocialLoginModule.initialize(config),
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
  ],
  providers: [PostsService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

// export function initApplication(authConfigService: AuthConfigService): Function {
//   return () => { return authConfigService.loadConfig();
// };
// }
