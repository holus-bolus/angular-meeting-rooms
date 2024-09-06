import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ForbiddenPageComponent } from './forbidden-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {SafeHtmlModule} from '@pipes/safe-html/safe-html.module';
import {ErrorHeaderComponent} from '@andkit/components/other/error-header/error-header.component';

describe('ForbiddenPageComponent', () => {
  let component: ForbiddenPageComponent;
  let fixture: ComponentFixture<ForbiddenPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ SafeHtmlModule, HttpClientTestingModule ],
      declarations: [ ForbiddenPageComponent, ErrorHeaderComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForbiddenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
