import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetNowComponent } from './meet-now.component';

describe('MeetNowComponent', () => {
  let component: MeetNowComponent;
  let fixture: ComponentFixture<MeetNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetNowComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
