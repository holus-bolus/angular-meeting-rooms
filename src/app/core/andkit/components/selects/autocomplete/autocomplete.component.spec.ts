import { ComponentFixture, TestBed, tick, fakeAsync, waitForAsync } from '@angular/core/testing';
import { AutoCompleteComponent } from './autocomplete.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { ICommonOption } from '@interfaces/filter';

const mockOptions: ICommonOption[] = [
  { id: '1', name: 'first val' },
  { id: '2', name: 'second val' }
];

describe('AutoCompleteComponent', () => {
  let component: AutoCompleteComponent;
  let fixture: ComponentFixture<AutoCompleteComponent>;
  const controlInitVar = 'someVal';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatAutocompleteModule,
        SafeHtmlModule
      ],
      declarations: [
        AutoCompleteComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(controlInitVar);
    component.options = mockOptions;
  });

  describe('standart loop', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should reset control value while onReset', () => {
      expect(component.control.value).toBe(controlInitVar);
      component.onReset();
      expect(component.control.value).toBe('');
    });
  });

  describe('focused loop', () => {
    beforeEach(() => {
      component.focus = true;
      fixture.detectChanges();
    });

    // SUSPENDED
    /*
      it('input element should get focus after init', fakeAsync(() => {
      const nativeInput = component.inputElement.nativeElement;
      const documentFocused = document.activeElement;
      tick(100);
      expect(nativeInput).toEqual(documentFocused);
    }));
    */
  });
});
