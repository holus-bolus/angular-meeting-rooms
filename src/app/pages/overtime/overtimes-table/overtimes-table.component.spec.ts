import { TableMenuAction } from '@andkit/components/other/table/table.config';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OvertimesTableComponent } from './overtimes-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IOvertimeValues } from '@interfaces/overtime.interface';

const tableHeadStub: string[] = [
  'column 1',
  'column 2',
  'column 3',
  'column 4',
  'column 5'
];

describe('OvertimesTableComponent', () => {
  let component: OvertimesTableComponent;
  let fixture: ComponentFixture<OvertimesTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OvertimesTableComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimesTableComponent);
    component = fixture.componentInstance;
    component.tableHead = tableHeadStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getSumAndHours', () => {
    it('should return 8 hours', () => {
      const over: IOvertimeValues = { hours: 8, ratio: 6, overType: { id: '1', name: 'over' } };

      const result = component.getSumAndHours(over);

      expect(result).toBe('8 hours');
    });

    it('should return 666 USD', () => {
      const over: IOvertimeValues = {
        sum: 666,
        currency: 'USD',
        ratio: 6,
        overType: { id: '1', name: 'over' }
      };

      const result = component.getSumAndHours(over);

      expect(result).toBe('666 USD');
    });
  });

  describe('onTriggerAction', () => {
    it('trigger action should emit value', () => {
      const over: IOvertimeValues = { hours: 8, ratio: 6, overType: { id: '1', name: 'over' } };
      const action = 'Action';

      const spyEmit = spyOn(component.triggerAction, 'emit');

      component.onTriggerAction(over, action);

      expect(spyEmit).toHaveBeenCalledTimes(1);
      expect(spyEmit.calls.first().args[0]).toEqual({ action, item: over });
    });
  });
});
