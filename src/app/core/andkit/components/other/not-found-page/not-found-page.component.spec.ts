import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NotFoundPageComponent } from './not-found-page.component';
import { RouterModule } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {SafeHtmlModule} from '@pipes/safe-html/safe-html.module';
import {ErrorHeaderComponent} from '@andkit/components/other/error-header/error-header.component';

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent;
  let fixture: ComponentFixture<NotFoundPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, SafeHtmlModule, RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }) ],
      declarations: [ NotFoundPageComponent, ErrorHeaderComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
