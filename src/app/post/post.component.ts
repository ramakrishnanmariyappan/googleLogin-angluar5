import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  bookId: any;
  book: any = [];
  constructor(private activateRoute: ActivatedRoute, private http: Http) {

  }
  getBook(id) {
    this.http.get('http://localhost:3000/book/' + id).subscribe((data) => {
      this.book = data.json();
    });
  }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((params: Params) => {
      this.bookId = params['id'];
      if (this.bookId != null) {
        this.getBook(this.bookId);
      }
    });
  }

}
