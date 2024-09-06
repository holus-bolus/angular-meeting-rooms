import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PlannedVacationsMainComponent } from './planned-vacations-main.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { PlannedVacationsService } from '@services/planned-vacations.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MultiplyEndOfWordPipeModule } from '@pipes/multiple-line-end/multiple-line-end.module';

describe('VacationMainComponent', () => {
  let component: PlannedVacationsMainComponent;
  let fixture: ComponentFixture<PlannedVacationsMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, RouterTestingModule, HttpClientTestingModule, MultiplyEndOfWordPipeModule],
      declarations: [PlannedVacationsMainComponent],
      providers: [PlannedVacationsService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedVacationsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create VacationMainComponent', () => {
    expect(component).toBeTruthy();
  });
});
