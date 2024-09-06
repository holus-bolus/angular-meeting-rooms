import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MainNewsComponent } from './main-news.component';
import { TruncatePipeModule } from '@pipes/truncate/truncate.pipe.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { CustomDatePipeModule } from '@pipes/custom-date/custom-date.pipe.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('MainNewsComponent', () => {
  let component: MainNewsComponent;
  let fixture: ComponentFixture<MainNewsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TruncatePipeModule,
        HttpClientTestingModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        CustomDatePipeModule,
        SafeHtmlModule
      ],
      declarations: [MainNewsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
