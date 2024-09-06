import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PeaceNewsComponent } from './piece-news.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { INewsRow } from '@interfaces/news';
import { Observable, of } from 'rxjs';
import { RolesService } from '@services/roles.service';
import { TimezoneModule } from '@pipes/timezone/timezone.module';

class MockedPersistanceStorage {
  getRoles(): Observable<string[]> {
    return of(['Employee, Admin']);
  }
}

const mockedNews: INewsRow = {
  id: '',
  published: '',
  tags: [],
  title: '',
  text: '',
  previewText: '',
  viewsCount: 0,
  topic: {
    id: '',
    icon: '',
    type: 0,
    name: '',
    alternativeIcon: ''
  },
  relatedNews: [],
  urlName: '',
};

describe('PeaceNewsComponent', () => {
  let component: PeaceNewsComponent;
  let fixture: ComponentFixture<PeaceNewsComponent>;
  let persistenceStorageService: MockedPersistanceStorage;
  const newsDetail = {
    data: of({oneNews: mockedNews}),
  };

  beforeEach(waitForAsync(() => {
    persistenceStorageService = new MockedPersistanceStorage();
    TestBed.configureTestingModule({
      imports: [
        TimezoneModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        HttpClientTestingModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: newsDetail},
        {provide: RolesService, useValue: persistenceStorageService}
      ],
      declarations: [ PeaceNewsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeaceNewsComponent);
    component = fixture.componentInstance;
    component.pieceNews$ = of(mockedNews);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
