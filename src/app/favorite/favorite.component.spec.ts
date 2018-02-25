import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ElementRef, Component, DebugElement, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/Rx';
import {
    Headers, BaseRequestOptions, Http, RequestOptions, ConnectionBackend,
    Response, ResponseOptions, RequestMethod, HttpModule, XHRBackend
} from '@angular/http';
// import { MaterialModule, MdSidenav, MdDialogModule, MdDialog } from '@angular/material';
import { FavoritePostComponent } from './favorite.component';
import { AuthService, SocialUser} from 'angular4-social-login';
import { PostsService } from '../service/posts.service';
import { ResponseType, Request } from '@angular/http';
import { RouterModule, Routes, Data } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/operator/map';
import { CategoryByNameFilter } from '../pipes/categoryfilter-pipe';
import { SearchByNameFilter } from '../pipes/namefilter-pipe';
import { SortByFilter } from '../pipes/sortby-pipe';
// import { MdDialogRef } from '@angular/material';


let component: FavoritePostComponent;
let fixture: ComponentFixture<FavoritePostComponent>;
let nav;
let routerStub;
let datas = [];
let searchResult = '';
let categoryResult = '';
let userposts: any = [];
// @Injectable()
// class MockCardService {
//     flag = 1;
//     flag1 = 2;
//     config: Cards = dataForCardService;
//     public loadCardData1(): Observable<any> {
//         return Observable.of(dataForCardService)
//     }
//     public loadCardData(): Observable<any> {
//         return Observable.of(dataForCardService);
//     }
// }
describe('FavoritePostComponent Component', () => {
    beforeEach(async(() => {
        routerStub = {
            navigate: jasmine.createSpy('navigate')
        };
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpModule, BrowserAnimationsModule],
            declarations: [FavoritePostComponent, CategoryByNameFilter, SearchByNameFilter, SortByFilter],
            providers: [MockBackend,
                { provide: PostsService},
                BaseRequestOptions,
                {
                    provide: Router, useValue: routerStub
                },
                {
                    provide: AuthService
                },
                { provide: XHRBackend, useClass: MockBackend },
                {
                    provide: Http,
                    useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                },
                {
                    provide: ActivatedRoute, useValue: { queryParams: Observable.of({ catValue: 'all' }) }
                }
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FavoritePostComponent);
        component = fixture.componentInstance;
    });
    beforeEach(inject([PostsService, MockBackend], (ras, mb) => {

    }));

    it('should initialize constructor functionality before ngOnInit()',
        inject([ActivatedRoute, PostsService, AuthService],
             (route: ActivatedRoute, postService: PostsService, authService: AuthService) => {
            expect(route).toBeDefined();
            route.queryParams.subscribe(params => {
                nav = params['catValue'];
                fixture.detectChanges();
                // expect(cardService.config).toEqual(dataForCardService);
                // expect(cardService.config.Customer.CustomerSubscriptions !== null).toBe(true);
                // component.cardsConfig = [];
            });
        }));
    it('After ngOnInit Favorite functionalities done ', (done) => {
        component.ngOnInit();
        fixture.detectChanges();
        // mockBackend.connections.subscribe((connection: MockConnection) => {
        //     expect(connection.request.method).toEqual(RequestMethod.Get);
        //     let options = new ResponseOptions({
        //         body: dataForCardService,
        //         status: 200
        //     });
            // connection.mockRespond(new Response(options));
        });
        // service2
        //     .loadCardData1()
        //     .subscribe(
        //     (data) => {
        //         component.config2 = data;
        //         component.CustomerId = data.Customer.CustomerId;
        //         component.config2.Customer.CustomerSubscriptions.map((item) => {
        //         })
        //     });
            fixture.detectChanges();
            expect(component).toBeDefined();
            // done();
    });

