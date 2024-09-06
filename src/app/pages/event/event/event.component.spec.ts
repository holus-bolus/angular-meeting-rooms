import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventComponent } from './event.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AnimationBuilder } from '@angular/animations';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { FooterModule } from '@andkit/components/other/footer/footer.module';
import { PunctuationTitleModule } from '@directives/punctuation-title/punctuation-title.module';
import { RolesService } from '@services/roles.service';
import { TruncatePipeModule } from '@pipes/truncate/truncate.pipe.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

const mockedEvent = {
  id: '',
  title: '',
  text: '',
  topic: {
    id: '',
    name: '',
    icon: '',
    type: 1,
  },
  poster: '',
  place: '',
  date: '0001-01-01T00:00:00',
  signupUrl: '',
  posterPreview: '',
  offices: [],
  relatedEvents: [],
  urlName: '',
};

const mockedRelatedEvents = new Array(3).fill(mockedEvent);

const eventDetail = {
  data: of({ event: mockedEvent }),
};

class MockedPersistanceStorage {
  isAdmin(): Observable<string[]> {
    return of(['Admin']);
  }
  isAdminHr$(): Observable<string[]> {
    return of(['Hr, Admin']);
  }
  isHr(): Observable<string[]> {
    return of(['Hr']);
  }
}


describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let persistenceStorageService: MockedPersistanceStorage;

  beforeEach(waitForAsync(() => {
    persistenceStorageService = new MockedPersistanceStorage();
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: eventDetail },
        { provide: RolesService, useValue: persistenceStorageService },
        AnimationBuilder
      ],
      declarations: [EventComponent],
      imports: [
        TimezoneModule,
        FooterModule,
        HttpClientTestingModule,
        TruncatePipeModule,
        PunctuationTitleModule,
        SafeHtmlModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create EventComponent', () => {
    expect(component).toBeTruthy();
  });
});
