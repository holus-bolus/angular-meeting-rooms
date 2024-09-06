import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MoreEventCardComponent } from './more-event-card.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImageCropperModule } from 'ngx-image-cropper';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { IEvent } from '@interfaces/event';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { ImagesService } from '@services/images.service';
import { ImageLoadService } from '@services/imageLoad.service';
import { LabelComponent } from '@andkit/components/other/event-card/label/label.component';

const mockedEvent: IEvent = {
  id: '',
  title: '',
  text: '',
  topic: {
    id: '',
    name: '',
    icon: 'icon',
    type: 1,
    alternativeIcon: ''
  },
  poster: '',
  place: '',
  date: '2019-12-27T00:00:00',
  signupUrl: '',
  posterPreview: 'posterPreview',
  urlName: '',
  offices: [],
  relatedEvents: []
};

const iconMock = 'iconMock';
const imageMock = new Blob();

describe('RelatedEventCardComponent', () => {
  let component: MoreEventCardComponent;
  let fixture: ComponentFixture<MoreEventCardComponent>;

  const imageLoadServiceStub = jasmine.createSpyObj<ImageLoadService>(['readFile']);
  const imagesServiceStub = jasmine.createSpyObj<ImagesService>(['getImage', 'getIcon']);

  const iconMock$ = of(iconMock).pipe(delay(100));
  const imageMock$ = of(imageMock).pipe(delay(100));

  imagesServiceStub.getImage.and.returnValue(imageMock$);
  imagesServiceStub.getIcon.and.returnValue(imageMock$);
  imageLoadServiceStub.readFile.and.returnValue(iconMock$);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MoreEventCardComponent, LabelComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        HttpClientTestingModule,
        ImageCropperModule,
        TimezoneModule,
        SafeHtmlModule
      ],
      providers: [
        [{ provide: ImagesService, useValue: imagesServiceStub }],
        [{ provide: ImageLoadService, useValue: imageLoadServiceStub }],
        [{
          provide: DomSanitizer, useValue: {
            sanitize: () => 'safeString',
            bypassSecurityTrustResourceUrl: value => `safeString ${value}`
          }
        }]
      ]
    }).overrideTemplate(MoreEventCardComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    imageLoadServiceStub.readFile.calls.reset();
    imagesServiceStub.getImage.calls.reset();
    imagesServiceStub.getIcon.calls.reset();
    fixture = TestBed.createComponent(MoreEventCardComponent);
    component = fixture.componentInstance;
    component.event = mockedEvent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call [ImagesService].[getImage] on init and store data to [posterImage$]', waitForAsync(() => {
    expect(imagesServiceStub.getImage).toHaveBeenCalledTimes(1);
    component.posterImage$.subscribe((data) => {
      expect(data).toBe(iconMock);
    });
  }));

  it('should call [ImagesService].[getIcon] on init and store data to [topicIcon$]', waitForAsync(() => {
    expect(imagesServiceStub.getIcon).toHaveBeenCalledTimes(1);
    component.topicIcon$.subscribe((data) => {
      expect(data).toBe(`safeString ${iconMock}`);
    });
  }));
});
