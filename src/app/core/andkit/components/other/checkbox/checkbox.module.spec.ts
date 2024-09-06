import { CheckboxComponent } from '@andkit/components/other/checkbox/checkbox.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('Checkbox test.', () => {

  let comp: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        declarations: [CheckboxComponent],
      },
    );

    fixture = TestBed.createComponent(CheckboxComponent);
    comp = fixture.componentInstance;
  });

  it('should click change value', () => {
    expect(comp.isChecked).toBeFalsy(); // default state

    comp.onCheckedChange();
    fixture.detectChanges();

    expect(comp.isChecked).toBeTruthy(); // state after click
  });
});
