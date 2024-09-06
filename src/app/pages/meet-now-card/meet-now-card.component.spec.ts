import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetNowCardComponent } from './meet-now-card.component';

describe('RoomCardComponent', () => {
  let component: MeetNowCardComponent;
  let fixture: ComponentFixture<MeetNowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetNowCardComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetNowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
