import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DefaultOfficeLandingComponent } from './default-office-landing.component';
import { Router } from '@angular/router';

describe('[DefaultOfficeLandingComponent] tests', () => {
  let component: DefaultOfficeLandingComponent;
  let fixture: ComponentFixture<DefaultOfficeLandingComponent>;
  const routerStub = jasmine.createSpyObj<Router>(['navigate']);
  routerStub.navigate.and.stub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultOfficeLandingComponent],
      providers: [
        { provide: Router, useValue: routerStub },
      ]
    })
      .overrideTemplate(DefaultOfficeLandingComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultOfficeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[handleWrapperOutput] method tests', () => {
    const office = { id: 'some-guid', name: 'some-name' };

    it('should throw error when [office] is null or undefined', () => {
      expect(() => { component.handleWrapperOutput(null); }).toThrow();
      expect(() => { component.handleWrapperOutput(undefined); }).toThrow();
    });

    it('should set proper [selectedOffice]', () => {
      component.handleWrapperOutput(office);
      expect(component.selectedOffice).toBe(office);
    });

    it('should call [Router].[Navigate] with [/] route', () => {
      routerStub.navigate.calls.reset();
      component.handleWrapperOutput(office);
      expect(routerStub.navigate).toHaveBeenCalledTimes(1);
      expect(routerStub.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
