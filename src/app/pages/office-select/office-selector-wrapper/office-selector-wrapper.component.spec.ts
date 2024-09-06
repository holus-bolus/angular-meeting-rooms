import { ComponentFixture, TestBed, tick, fakeAsync, waitForAsync } from '@angular/core/testing';
import { OfficeSelectorWrapperComponent } from './office-selector-wrapper.component';
import { Observable, of } from 'rxjs';
import { DictionaryLike } from '../dictionary-like.interface';
import { OfficeService } from '@services/office.service';
import { delay } from 'rxjs/operators';
import { IOffice } from 'src/app/interfaces/office';
import { TIME_ZONES } from '@constants/timezones';

describe('[OfficeSelectorWrapperComponent] tests', () => {
  let component: OfficeSelectorWrapperComponent;
  let fixture: ComponentFixture<OfficeSelectorWrapperComponent>;

  const serviceStub = jasmine.createSpyObj<OfficeService>(['getAll', 'setCurrentOffice']);
  const dataMock: Observable<DictionaryLike[]> = of([
    { id: '1', name: 'Moscow' },
    { id: '2', name: 'London' },
  ]);
  serviceStub.getAll.and.returnValue(dataMock.pipe(delay(100)));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OfficeSelectorWrapperComponent],
      providers: [
        { provide: OfficeService, useValue: serviceStub }
      ]
    }).overrideTemplate(OfficeSelectorWrapperComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    serviceStub.getAll.calls.reset();
    serviceStub.setCurrentOffice.calls.reset();
    fixture = TestBed.createComponent(OfficeSelectorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call [OfficeService].[getAll] on init and store data to [offices$]', waitForAsync(() => {
    expect(serviceStub.getAll).toHaveBeenCalledTimes(1);
    component.offices$.subscribe((data) => {
      expect(data.length).toBe(2);
    });
  }));

  describe('[handleChildSelection] method tests', () => {
    it('should throw erro if [officeId] is null of undefined', () => {
      expect(() => { component.handleChildSelection(null); }).toThrow();
      expect(() => { component.handleChildSelection(undefined); }).toThrow();
    });

    it('should emit officeId after service [setCurrentOffice] successful call', fakeAsync(() => {
      const dataStab: IOffice = {
        id: 'some id',
        name: 'name',
        photo: '',
        address: '',
        meetingRoomUrl: '',
        networks: [],
        hrs: [],
        timeZone: TIME_ZONES.MINSK
      };

      serviceStub.setCurrentOffice.and.returnValue(of(dataStab).pipe(delay(100)));
      spyOn(component.selectionComplete, 'emit');
      component.handleChildSelection('some id');

      tick(120);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(serviceStub.setCurrentOffice).toHaveBeenCalledTimes(1);
        expect(serviceStub.setCurrentOffice).toHaveBeenCalledWith('some id');
        expect(component.selectionComplete.emit).toHaveBeenCalledTimes(1);
        expect(component.selectionComplete.emit).toHaveBeenCalledWith(dataStab);
      });
    }));
  });
});
