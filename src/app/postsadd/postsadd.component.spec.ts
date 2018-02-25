import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsaddComponent } from './postsadd.component';

describe('PostsaddComponent', () => {
  let component: PostsaddComponent;
  let fixture: ComponentFixture<PostsaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
