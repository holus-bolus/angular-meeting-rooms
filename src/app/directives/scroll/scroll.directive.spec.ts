import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSelect } from '@angular/material/select';
import { ScrollDirective } from './scroll.directive';

describe('ScrollDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let debugElement: DebugElement;
  let hostComponent: TestHostComponent;
  const mockMatSelect = { close: () => { } };
  @Component({
    template: `<mat-select andteamScroll></mat-select>`
  })
  class TestHostComponent { }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScrollDirective,
        TestHostComponent,
      ],
      providers: [{ provide: MatSelect, useValue: mockMatSelect }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    debugElement = fixture.debugElement;
    hostComponent = fixture.componentInstance;
  });


  it('should create an instance', () => {
    const directive = new ScrollDirective(null);

    expect(directive).toBeTruthy();
  });

  describe('onScroll', () => {
    it('should close dropdown', () => {
      const directive = new ScrollDirective(mockMatSelect as MatSelect);

      spyOn(mockMatSelect, 'close');

      directive.onScroll();

      expect(mockMatSelect.close).toHaveBeenCalled();
    });
  });
});
