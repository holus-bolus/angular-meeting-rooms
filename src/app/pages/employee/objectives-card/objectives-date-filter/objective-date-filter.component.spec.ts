import { ObjectivesDateFilterComponent } from './objective-date-filter.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ObjectivesDateFilterComponent', () => {
  let component: ObjectivesDateFilterComponent;
  let fixture: ComponentFixture<ObjectivesDateFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectivesDateFilterComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivesDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onDateSelect should set activeDate', () => {
    component.onDateSelect('SELECTED_DATE');

    expect(component.activeDate).toBe('SELECTED_DATE');
  });

  it('onDateSelect should navigate with queryParam date = SELECTED_DATE', () => {
    const router = TestBed.inject(Router);

    spyOn(router, 'navigate');

    component.onDateSelect('SELECTED_DATE');

    expect(router.navigate).toHaveBeenCalledWith(jasmine.any(Array), { queryParams: { date: 'SELECTED_DATE' } });
  });
});
