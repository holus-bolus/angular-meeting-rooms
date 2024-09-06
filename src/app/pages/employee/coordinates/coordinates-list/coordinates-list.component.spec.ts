import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { CoordinatesListComponent } from './coordinates-list.component';
import { MatTableModule } from '@angular/material/table';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafePipe } from '@pipes/safe-html/safe-html.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoordinatesService } from '@services/coordinates.service';

describe('CoordinatesListComponent', () => {
  let component: CoordinatesListComponent;
  let fixture: ComponentFixture<CoordinatesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule, HttpClientTestingModule, MatTableModule],
      declarations: [
        CoordinatesListComponent, SafePipe
      ],
      providers: [CoordinatesService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatesListComponent);
    component = fixture.componentInstance;
    component.columnsList = [
      {
        id: 'test',
        name: 'test',
        disabled: false,
        checked: false
      }
    ];
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
