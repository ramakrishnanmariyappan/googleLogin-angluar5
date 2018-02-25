import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AuthService, SocialUser } from 'angular4-social-login';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { promise } from 'selenium-webdriver';
import { Resolve } from '@angular/router/src/interfaces';

@Injectable()
export class AuthConfigService {
    books: any = null;
    user: SocialUser;
    loggedIn: boolean;
    role: String;
    constructor(private authService: AuthService) {
    }
    loadConfig() {
        return new Promise((resolve) => {
            return this.authService.authState.subscribe((user) => {
                 this.user = user;
                 resolve();
            });
        });
    }
}


