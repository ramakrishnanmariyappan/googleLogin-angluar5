import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PostsService } from '../service/posts.service';
import { Router } from '@angular/router';
import { SearchByNameFilter } from '../pipes/namefilter-pipe';
import { SocialUser, AuthService} from 'angular4-social-login';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  user: SocialUser;
  role: String;
  UserPost: any;
  posts: any = [];
  searchResult = '';
  categoryResult = '';
  body: any = [];
  favorite: any;
  constructor(private service: PostsService, private http: Http, private router: Router, private authService: AuthService) {
   }
  getbooks() {
    this.service.viewbook().subscribe((posts) => {
      this.posts = posts;
    });
  }
  ngOnInit() {
    this.getbooks();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (this.user != null) {
        this.role = this.user.email === environment.admin ? 'admin' : 'user';
      }
    });
  }
  BarrowBook(id, isbn, mail) {
    this.body = {
       email: mail,
      isbn: isbn
    };
    this.http.post('http://localhost:3000/userpost/' + id, this.body).subscribe((data) => {
      this.router.navigate(['/userposts']);
    },
   (error) => {
   });
  }
  FavoriteBook(id, email) {
    this.favorite = {
      email: email,
      favorite: true
    };
    this.http.post('http://localhost:3000/favorite/' + id, this.favorite).subscribe((data) => {
    }, (error) => {
    } );
  }
  deleteBook(id) {
    this.http.get('http://localhost:3000/deletebook/' + id).subscribe(
      (res) => {
        this.getbooks();
      },
      (error) => {
      }
    );
  }
  onCategorySelect(category: any) {
    return this.categoryResult = category;
  }
  onChange(searchValue: any) {
    return this.searchResult = searchValue;
  }

}
