import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthService, SocialUser} from 'angular4-social-login';
import { PostsService } from '../service/posts.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-userpost',
  templateUrl: './userpost.component.html',
  styleUrls: ['./userpost.component.scss']
})
export class UserpostComponent implements OnInit {
  comment = new FormControl('', [Validators.required, Validators.nullValidator]);
  commentby = new FormControl('', [Validators.required, Validators.nullValidator]);
  rating = new FormControl('', [Validators.required, Validators.nullValidator]);
  postAdd: FormGroup;
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
  constructor(private fb: FormBuilder, private service: PostsService,
    private http: Http, private router: Router, private authService: AuthService) {
      this.createForm();
   }
   getErrorComment() {
    return this.comment.hasError('required') ? 'You must enter a value' :
        this.comment.hasError('nullValidator') ? 'empty input' :
            '';
  }
  getErrorCommentBy() {
    return this.commentby.hasError('required') ? 'You must enter a value' :
        this.commentby.hasError('nullValidator') ? 'empty input' :
            '';
  }
  getErrorRating() {
    return this.rating.hasError('required') ? 'You must enter a value' :
        this.rating.hasError('nullValidator') ? 'empty input' :
            '';
  }
  createForm() {
    this.postAdd = this.fb.group({
      comment: [null,  Validators.required],
      commented_by: [null,  Validators.required ],
      rating: [0,  Validators.required ]
    });
   }
  getbooks() {
    this.service.viewbook().subscribe((posts) => {
      this.posts = posts;
      this.posts.map((data) => {
        data.user.filter((post) => post.email === this.user.email)
        .map((post) => {
          this.userisbn = post.isbn;
          this.posts.filter((data) => this.userisbn === data.isbn)
          .map((data, key) => {
            return this.datas[key] = data;
          }).forEach((res) => this.userposts.push(res));
        });
      });
    });
  }
  OnSubmit(id) {
      this.http.post('http://localhost:3000/comment/' + id, this.postAdd.value).subscribe((data) => {
        alert('Data Added Successfully');
        this.router.navigate(['/viewbooks']);
      },
     (error) => {
     });
    }
  ngOnInit() {
    this.createForm();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (this.user != null) {
        this.role = this.user.email === environment.admin ? 'admin' : 'user';
        this.getbooks();
      }
    });
  }
  ReturnBook(id, isbn, mail) {
    this.body = {
       email: mail,
      isbn: isbn
    };
    this.http.post('http://localhost:3000/returnbook/' + id, this.body).subscribe((data) => {
      this.router.navigate(['/viewbooks']);
    },
   (error) => {
   });
  }
  FavoriteBook(id, email) {
    console.log('idddd' + id)
    this.favorite = {
      email: email,
      favorite: true
    };
    this.http.post('http://localhost:3000/favorite/' + id, this.favorite).subscribe((data) => {
      this.router.navigate(['/favorite']);
    }, (error) => {
      console.log('error on favorite' + error);
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
    category: String;
    comments: [{comment: String, commented_by: String, rating: Number}];
    user: [{email: String, from: Date, to: Date, remain: Number, favorite: Boolean}];
}
