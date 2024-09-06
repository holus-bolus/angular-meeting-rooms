import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NewsCardComponent } from './news-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomDatePipeModule } from '@pipes/custom-date/custom-date.pipe.module';
import { TruncateTitleModule } from '@directives/truncate-title/truncate-title.module';
import { TruncatePipeModule } from '@pipes/truncate/truncate.pipe.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { INewsRow } from '@interfaces/news';
import { TextLengthModule } from '@pipes/text-length/text-length.module';

const mockedPieceNews: INewsRow = {
  id:	'',
  title:	'',
  text:	'',
  previewText: '',
  topic: {
    id: '',
    name: '',
    icon: '',
    type: 0,
    alternativeIcon: ''
  },
  viewsCount: 0,
  published: '0001-01-01T00:00:00',
  tags: [],
  relatedNews: [],
  urlName: '',
};

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomDatePipeModule,
        TruncateTitleModule,
        TruncatePipeModule,
        SafeHtmlModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        HttpClientTestingModule,
        TextLengthModule
      ],
      declarations: [NewsCardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
    component.pieceNews = mockedPieceNews;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
