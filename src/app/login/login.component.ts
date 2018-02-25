import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, SocialUser } from 'angular4-social-login';
import { GoogleLoginProvider } from 'angular4-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;

  constructor(private router: Router, private authService: AuthService) {

  }
  userStatus() {
    if (window.localStorage.getItem('loggedIn') === null ||
      this.user === null || window.localStorage.getItem('loggedIn') === undefined) {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        window.localStorage.setItem('loggedIn', JSON.stringify(this.user));
        this.loggedIn = (this.user != null);
        if (this.loggedIn === true) {
          this.router.navigate(['/viewbooks']);
        } else {
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.user = JSON.parse(window.localStorage.getItem('loggedIn'));
      this.loggedIn = (this.user != null);
      if (this.loggedIn === true) {
        this.router.navigate(['/viewbooks']);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
  ngOnInit() {
    this.userStatus();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.router.navigate(['/viewbooks']);
    });
  }

}
