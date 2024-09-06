import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventCardComponent } from './event-card.component';
import { LabelComponent } from './label/label.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { IEvent } from '@interfaces/event';

const mockedEvent: IEvent = {
  id: '',
  title: '',
  text: '',
  topic: {
    id: '',
    name: '',
    icon: '',
    type: 1,
    alternativeIcon: ''
  },
  poster: '',
  place: '',
  date: '2019-12-27T00:00:00',
  signupUrl: '',
  posterPreview: '',
  urlName: '',
  offices: [],
  relatedEvents: []
};


describe('EventCardComponent', () => {
  let component: EventCardComponent;
  let fixture: ComponentFixture<EventCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EventCardComponent, LabelComponent],
      imports: [
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        HttpClientTestingModule,
        ImageCropperModule,
        TimezoneModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCardComponent);
    component = fixture.componentInstance;
    component.event = mockedEvent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
