import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PortalButtonComponent } from './portal-button.component';

describe('PortalButtonComponent', () => {
  let component: PortalButtonComponent;
  let fixture: ComponentFixture<PortalButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
