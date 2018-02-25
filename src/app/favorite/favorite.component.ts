import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthService, SocialUser} from 'angular4-social-login';
import { PostsService } from '../service/posts.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-userpost',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoritePostComponent implements OnInit {

  user: SocialUser;
  role: String;
  UserPost: any;
  datas = [];
  posts: any;
  searchResult = '';
  categoryResult = '';
  body: any;
  userposts: any = [];
  favorite: any;
  userisbn: any;
  constructor(private service: PostsService, private http: Http, private router: Router, private authService: AuthService) {
   }
  getbooks() {
    this.service.viewbook().subscribe((posts) => {
      this.posts = posts;
      this.posts.map((data) => {
        console.log('posssst pre' + JSON.stringify(data));
        data.user.filter((post) => post.email === this.user.email && post.favorite === true)
        .map((post) => {
          console.log('posssst' + JSON.stringify(post));
          this.userisbn = post.isbn;
          this.posts.filter((data) => this.userisbn === data.isbn)
          .map((data, key) => {
            return this.datas[key] = data;
          }).forEach((res) => this.userposts.push(res));
        });
      });
    });
  }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (this.user != null) {
        this.role = this.user.email === environment.admin ? 'admin' : 'user';
        this.getbooks();
      }
    });
  }
  UnFavoriteBook(id, email) {
    this.favorite = {
      email: email,
      favorite: false
    };
    this.http.post('http://localhost:3000/favorite/' + id, this.favorite).subscribe((data) => {
      this.router.navigate(['/userposts']);
    }, (error) => {
    } );
  }
  onCategorySelect(category: any) {
    return this.categoryResult = category;
  }
  onChange(searchValue: any) {
    return this.searchResult = searchValue;
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
