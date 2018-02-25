import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-postsadd',
  templateUrl: './postsadd.component.html',
  styleUrls: ['./postsadd.component.scss']
})
export class PostsaddComponent implements OnInit {
  title = new FormControl('', [Validators.required, Validators.nullValidator]);
  body = new FormControl('', [Validators.required, Validators.nullValidator]);
  isbn = new FormControl('', [Validators.required, Validators.nullValidator]);
  description = new FormControl('', [Validators.required, Validators.nullValidator]);
  author = new FormControl('', [Validators.required, Validators.nullValidator]);
  category = new FormControl('', [Validators.required, Validators.nullValidator]);
  image = new FormControl('', [Validators.required, Validators.nullValidator]);
  postAdd: FormGroup;
  bookId: any;
  operation: String = 'Add';
  bookDetail: any = [];

  constructor(private fb: FormBuilder, private http: Http, private activatedRoute: ActivatedRoute, private router: Router) {
    this.createForm();
   }
   getErrorTitle() {
    return this.title.hasError('required') ? 'You must enter a value' :
        this.title.hasError('nullValidator') ? 'empty input' :
            '';
  }
  getErrorDescription() {
    return this.description.hasError('required') ? 'You must enter a value' :
        this.description.hasError('nullValidator') ? 'empty input' :
            '';
  }
  getErrorAuthor() {
    return this.author.hasError('required') ? 'You must enter a value' :
        this.author.hasError('nullValidator') ? 'empty input' :
            '';
  }
  getErrorISBN() {
    return this.isbn.hasError('required') ? 'You must enter a value' :
        this.isbn.hasError('nullValidator') ? 'empty input' :
            '';
  }
  getErrorCategory() {
    return this.category.hasError('required') ? 'You must enter a value' :
        this.category.hasError('nullValidator') ? 'empty input' :
            '';
  }
  getErrorImage() {
    return this.image.hasError('required') ? 'You must enter a value' :
        this.image.hasError('nullValidator') ? 'empty input' :
            '';
  }
   createForm() {
    this.postAdd = this.fb.group({
      title: [null,  Validators.required],
      author: [null,  Validators.required ],
      isbn: [null,  Validators.required ],
      description: [null,  Validators.required ],
      category: [null, Validators.required],
      image: [null, Validators.required]
    });
   }
   getBook(id) {
     this.http.get('http://localhost:3000/getbook/' + id).subscribe((data) => {
       const book = data.json();
       this.fetchData(book);
     });
   }
   fetchData(bookdetail) {
     this.operation = 'Update';
    this.postAdd.patchValue({
      title: bookdetail.title,
      author: bookdetail.author,
      isbn: bookdetail.isbn,
      description: bookdetail.description,
      category: bookdetail.category,
      image: bookdetail.image
    });
   }
   OnSubmit() {
    // const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // const options = new RequestOptions({method: 'POST', headers: headers });
    if (this.operation === 'Add') {
      this.http.post('http://localhost:3000/add', this.postAdd.value).subscribe((data) => {
        alert('Data Added Successfully');
        this.router.navigate(['/viewbooks']);
      },
     (error) => {
     });
    } else {
      this.http.post('http://localhost:3000/updatebook/' + this.bookId, this.postAdd.value).subscribe((data) => {
        alert('Data Updated Successfully');
        this.router.navigate(['/viewbooks']);
      },
    (error) => {
    });
    }
   }
  ngOnInit() {
    this.createForm();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.bookId = params['id'];
      if (this.bookId != null) {
        this.getBook(this.bookId);
      }
    });
  }

}
