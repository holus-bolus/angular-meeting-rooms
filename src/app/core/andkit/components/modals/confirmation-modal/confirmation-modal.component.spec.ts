import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalScrollService } from '@services/modalScroll.service';

class ModalScrollServiceMock {
  disable():void {}
  enable(): void {}
}

describe('PortalConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let service: ModalScrollService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationModalComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provider: ModalScrollService, useClass: ModalScrollServiceMock
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ModalScrollService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('ngOnInit', () => {

    it('cautionSvg should be truthy', () => {
      component.ngOnInit();
      expect(component.cautionIcon).toBeTruthy();
    });
  });

  describe('ngOnDestroy', () => {

    it('should enable scroll', () => {
      const spy = spyOn(service, 'enable');
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('confirm', () => {

    it('should emit confirm event', () => {
      const spy = spyOn(component.sendConfirmEvent, 'emit');
      component.confirm();
      expect(spy).toHaveBeenCalled();
    });

    it('isConfirmationModal should be false', () => {
      component.confirm();
      expect(component.isConfirmationModal).toBeFalsy();
    });
  });

  describe('cancelConfirm', () => {

    it('should emit close event', () => {
      const spy = spyOn(component.sendCloseEvent, 'emit');
      component.cancelConfirm();
      expect(spy).toHaveBeenCalled();
    });
  });
});


