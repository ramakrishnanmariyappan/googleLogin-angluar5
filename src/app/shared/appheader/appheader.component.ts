import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser} from 'angular4-social-login';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.scss']
})
export class AppHeaderComponent implements OnInit {
  role: String;
  loggedIn: boolean;
  user: SocialUser;
  empty = null;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (this.user != null);
      if (this.user != null) {
        this.role = this.user.email === environment.admin ? 'admin' : 'user';
      }else {
        this.user = JSON.parse(window.localStorage.getItem('loggedIn'));
        this.loggedIn = (this.user != null);
        this.role = this.user.email === environment.admin ? 'admin' : 'user';
      }
    });
  }
  signOut(): void {
    sessionStorage.clear();
    window.localStorage.removeItem('loggedIn');
    localStorage.clear();
  }
}
