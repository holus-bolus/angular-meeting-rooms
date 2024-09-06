import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OneToOneNotFoundComponent } from './one-to-one-not-found.component';

describe('OneToOneNotFoundComponent', () => {
  let component: OneToOneNotFoundComponent;
  let fixture: ComponentFixture<OneToOneNotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OneToOneNotFoundComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneToOneNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
