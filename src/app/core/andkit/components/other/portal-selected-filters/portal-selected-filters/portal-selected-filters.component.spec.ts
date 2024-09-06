import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PortalSelectedFiltersComponent } from './portal-selected-filters.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutocompletePortalModule} from '@andkit/components/selects/autocomplete-portal/autocomplete-portal.module';
import {ChipModule} from '@andkit/components/other/chip/chip.module';
import {ChipsAutocompleteModule} from '@andkit/components/selects/chips-autocomplete/chips-autocomplete.module';
import {SlideTogglerModule} from '@andkit/components/other/slide-toggler/slide-toggler.module';
import {PortalInputModule} from '@andkit/components/inputs/portal-input/portal-input.module';

describe('FilterPanelPortalComponent', () => {
  let component: PortalSelectedFiltersComponent;
  let fixture: ComponentFixture<PortalSelectedFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalSelectedFiltersComponent ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SlideTogglerModule,
        ChipModule,
        ChipsAutocompleteModule,
        AutocompletePortalModule,
        PortalInputModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalSelectedFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
