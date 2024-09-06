import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OvertimeModalComponent } from './overtime-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalScrollService } from '@services/modalScroll.service';

class ModalScrollServiceMock {
  disable():void {}
  enable(): void {}
}

describe('OvertimeModalComponent', () => {
  let component: OvertimeModalComponent;
  let fixture: ComponentFixture<OvertimeModalComponent>;
  let service: ModalScrollService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OvertimeModalComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provider: ModalScrollService, useClass: ModalScrollServiceMock
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeModalComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ModalScrollService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('cautionIcon should be truthy', () => {
      component.ngOnInit();
      expect(component.cautionIcon).toBeTruthy();
    });
  });

  describe('ngOnDestroy', () => {

    it('should call enable service method', () => {
      const spy = spyOn(service, 'enable');
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('confirm', () => {

    it('should emit sendConfirmEvent', () => {
      const spy = spyOn(component.sendConfirmEvent, 'emit');
      component.confirm();
      expect(spy).toHaveBeenCalled();
    });

    it('should set isConfirmationModal to false', () => {
      component.confirm();
      expect(component.isConfirmationModal).toBeFalsy();
    });
  });

  describe('cancelConfirm', () => {

    it('should emit sendCloseEvent', () => {
      const spy = spyOn(component.sendCloseEvent, 'emit');
      component.cancelConfirm();
      expect(spy).toHaveBeenCalled();
    });
  });
});
