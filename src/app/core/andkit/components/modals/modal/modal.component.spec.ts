import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { ModalScrollService } from '@services/modalScroll.service';

class ModalScrollServiceMock {
  disable():void {}
  enable(): void {}
}

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let service: ModalScrollService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [SafeHtmlModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provider: ModalScrollService, useClass: ModalScrollServiceMock
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ModalScrollService);
  });

  afterEach(() => fixture.detectChanges());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should call service disable method', () => {
      const spy = spyOn(service, 'disable');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {

    it('should call service enable method', () => {
      const spy = spyOn(service, 'enable');
      expect(component.isConfirmationModal).toBeFalsy();
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onCloseClick', () => {

    it('should emit closeClick event', () => {
      const spy = spyOn(component.closeClick, 'emit');
      component.onCloseClick();
      expect(spy).toHaveBeenCalled();
    });

    it('should set isConfirmationModal to false', () => {
      component.onCloseClick();
      expect(component.isConfirmationModal).toBeFalsy();
    });
  });

  describe('onModalClick', () => {

    it('should call stopPropagation', () => {
      const event: MouseEvent = new MouseEvent('click');
      const spy = spyOn(event, 'stopPropagation');
      component.onModalClick(event);
      expect(spy).toHaveBeenCalled();
    });
  });
});
