import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angular4-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Anytime Library Managament Application';
  user: SocialUser;
  loggedIn: boolean;
  role: String;
  constructor() {
  }
  ngOnInit() {
  }
}
