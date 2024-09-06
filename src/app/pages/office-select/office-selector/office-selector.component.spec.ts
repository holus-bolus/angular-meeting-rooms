import { OfficeSelectorComponent } from './office-selector.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { DictionaryLike } from '../dictionary-like.interface';
import { OfficeListComponent } from '../office-list/office-list.component';
import { By } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

const officeSelectorComponentMock: Observable<DictionaryLike[]> = of([
  { id: '1', name: 'Minsk' },
  { id: '2', name: 'Khabarovsk' },
  { id: '3', name: 'St. Pitersburg' },
  { id: '4', name: 'Moskov' },
  { id: '5', name: 'Vitebsk' },
  { id: '6', name: 'Odessa' },
  { id: '7', name: 'Cherkasy' },
  { id: '8', name: 'London' },
  { id: '9', name: 'Paris' },
  { id: '10', name: 'Kiev' },
]);

describe('[OfficeSelectorComponent] tests', () => {
  let component: OfficeSelectorComponent;
  let fixture: ComponentFixture<OfficeSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SafeHtmlModule,
      ],
      declarations: [
        OfficeSelectorComponent,
        OfficeListComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSelectorComponent);
    component = fixture.componentInstance;
    component.offices$ = officeSelectorComponentMock.pipe(delay(100));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[onSelected] method tests', () => {
    it('should throw error when [id] is null or undefined', () => {
      expect(() => { component.onSelected(null); }).toThrowError();
      expect(() => { component.onSelected(undefined); }).toThrowError();
    });
    it('should update [currentOfficeId] and [disableConfirm] ', () => {
      component.onSelected('10');
      expect(component.currentOfficeId).toBe('10');
      expect(component.disableConfirm).toBeFalsy();
    });
  });

  describe('[confirmSelection] method tests', () => {
    it('should throw error when [currentOfficeId] is null or undefined', () => {
      expect(() => { component.confirmSelection(); }).toThrow();
    });
    it('should emit selected [id] ', () => {
      component.onSelected('10');
      spyOn(component.officeSelected, 'emit');
      component.confirmSelection();
      expect(component.officeSelected.emit).toHaveBeenCalledTimes(1);
      expect(component.officeSelected.emit).toHaveBeenCalledWith('10');
    });
  });

  describe('template bindings tests', () => {
    it('should select proper [id] after child list element was clicked ', waitForAsync(() => {
      fixture.whenStable().then(
        () => {
          fixture.detectChanges();
          const firstLine = fixture.debugElement.queryAll(By.css('div.list-item'))[0];
          firstLine.triggerEventHandler('click', null);
          expect(component.currentOfficeId).toBe('1');
        }
      );
    }));

    it('should enable confirm after child list element was clicked ', waitForAsync(() => {
      fixture.whenStable().then(
        () => {
          fixture.detectChanges();
          const firstLine = fixture.debugElement.queryAll(By.css('div.list-item'))[0];
          const button = fixture.debugElement.queryAll(By.css('button'))[0];
          expect(button.nativeElement.disabled).toBeTruthy();

          firstLine.triggerEventHandler('click', null);
          fixture.detectChanges();
          expect(component.disableConfirm).toBe(false);
          expect(button.nativeElement.disabled).toBeFalsy();
        }
      );
    }));

    it('should emit proper [id] after button clicked', waitForAsync(() => {
      fixture.whenStable().then(
        () => {
          spyOn(component.officeSelected, 'emit');
          component.onSelected('12');
          fixture.detectChanges();
          const button = fixture.debugElement.queryAll(By.css('button'))[0];
          button.triggerEventHandler('click', null);
          fixture.detectChanges();
          expect(component.officeSelected.emit).toHaveBeenCalledTimes(1);
          expect(component.officeSelected.emit).toHaveBeenCalledWith('12');
        }
      );
    }));
  });
});
