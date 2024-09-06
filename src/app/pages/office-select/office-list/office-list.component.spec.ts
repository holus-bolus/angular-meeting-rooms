import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OfficeListComponent } from './office-list.component';
import { delay } from 'rxjs/operators';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { DictionaryLike } from '../dictionary-like.interface';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

const officeListComponentMock: Observable<DictionaryLike[]> = of([
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

describe('[ListSelectComponent] tests', () => {
  let component: OfficeListComponent;
  let fixture: ComponentFixture<OfficeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SafeHtmlModule],
      declarations: [OfficeListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[onClick] method tests', () => {
    it('should throw error when [id] is null or undefined', () => {
      expect(() => { component.onClick(null); }).toThrow();
      expect(() => { component.onClick(undefined); }).toThrow();
    });
    it('should update [selectedId] property', () => {
      component.onClick('10');
      expect(component.selectedId).toBe('10');
    });
    it('should call [itemSelected.emit] properly', () => {
      spyOn(component.itemSelected, 'emit');
      component.onClick('12');
      expect(component.itemSelected.emit).toHaveBeenCalledTimes(1);
      expect(component.itemSelected.emit).toHaveBeenCalledWith('12');
    });
  });

  describe('template bindings tests', () => {
    beforeEach(() => {
      component.offices$ = officeListComponentMock.pipe(delay(100));
      fixture.detectChanges();
    });

    it('should call [onClick], when item line was clicked', waitForAsync(() => {
      fixture.whenStable().then(
        () => {
          fixture.detectChanges();
          const firstLine = fixture.debugElement.queryAll(By.css('div.list-item'))[0];
          firstLine.triggerEventHandler('click', null);
          expect(component.selectedId).toBe('1');
        }
      );
    }));
  });
});
