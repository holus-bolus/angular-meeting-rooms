import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NewsBlockComponent } from './news-block.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TruncatePipeModule } from '@pipes/truncate/truncate.pipe.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { INewsRow } from '@interfaces/news';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

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

describe('NewsBlockComponent', () => {
  let component: NewsBlockComponent;
  let fixture: ComponentFixture<NewsBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TruncatePipeModule,
        HttpClientTestingModule,
        TimezoneModule,
        SafeHtmlModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }) ],
      declarations: [ NewsBlockComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsBlockComponent);
    component = fixture.componentInstance;
    component.pieceNews = mockedPieceNews;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
