import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angular4-social-login';

@Injectable()
export class PostsService {
  books: any = null;
  user: SocialUser;
  loggedIn: boolean;
  role: String;
  logged_in: String = String[''];
  constructor(private http: Http, private router: Router) {
  }
  public viewbook(): Observable<UserPost> {
    return this.http.get('http://localhost:3000/viewbooks')
      .map((data) => {
        return <UserPost>data.json();
      }, error => {
      });
  }
}
export class UserPost {
  title: String;
  author: String;
  isbn: String;
  description: String;
  rating: Number;
  category: String;
  comments: [{body: String, commented_by: String, date: Date}];
  user: [{email: String, from: Date, to: Date, remain: Number, favorite: Boolean}];
}
