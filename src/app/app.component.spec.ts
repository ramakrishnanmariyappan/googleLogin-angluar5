import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ElementRef, Component, DebugElement, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/Rx';
import {
    Headers, BaseRequestOptions, Http, RequestOptions, ConnectionBackend,
    Response, ResponseOptions, RequestMethod, HttpModule, XHRBackend
} from '@angular/http';
// import { MaterialModule, MdSidenav, MdDialogModule, MdDialog } from '@angular/material';
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
// import { MdDialogRef } from '@angular/material';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
    beforeEach(async(() => {
        let routerStub = {
            navigate: jasmine.createSpy('navigate')
        };
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpModule, BrowserAnimationsModule],
            declarations: [AppComponent],
            providers: [MockBackend,
                BaseRequestOptions,
                {
                    provide: Router, useValue: routerStub
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
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });
    beforeEach(inject([MockBackend], (ras, mb, cservice, authServ, d) => {

    }));

    it('app component initialize before ngOnInit',
        inject([ActivatedRoute], (route: ActivatedRoute) => {
          fixture.detectChanges();
          component.ngOnInit();
        }));
});
