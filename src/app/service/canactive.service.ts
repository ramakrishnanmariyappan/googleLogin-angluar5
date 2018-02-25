import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService , SocialUser} from 'angular4-social-login';


@Injectable()
export class LoggedInGuard implements CanActivate {
  loggedIn: boolean;
  user: SocialUser;
  constructor(private router: Router, private authService: AuthService) {
  }
  canActivate() {
    if (window.localStorage.getItem('loggedIn') === null || this.user === null || window.localStorage.getItem('loggedIn').length === 0) {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (this.user != null);
      });
    } else {
      this.user = JSON.parse(window.localStorage.getItem('loggedIn'));
      this.loggedIn = (this.user != null);
    }
    if (this.loggedIn === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
