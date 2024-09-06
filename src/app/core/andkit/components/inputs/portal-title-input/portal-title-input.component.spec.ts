import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PortalTitleInputComponent } from './portal-title-input.component';

describe('PortalTitleInputComponent', () => {
  let component: PortalTitleInputComponent;
  let fixture: ComponentFixture<PortalTitleInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalTitleInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalTitleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
