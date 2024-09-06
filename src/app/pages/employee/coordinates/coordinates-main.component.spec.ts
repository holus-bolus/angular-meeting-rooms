import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoordinatesMainComponent } from './coordinates-main.component';
import { SettingsMultiselectModule } from '@andkit/components/other/settings-multiselect/settings-multiselect.module';
import { CoordinatesService } from '@services/coordinates.service';
import { EmployeeIdService } from '@services/employee-id.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CoordinatesListComponent } from '@pages/employee/coordinates/coordinates-list/coordinates-list.component';
import { CommonModule } from '@angular/common';
import { CoordinatesRoutingModule } from '@pages/employee/coordinates/coordinates-routing.module';
import { MatTableModule } from '@angular/material/table';
import { AndkitModule } from '@andkit/andkit.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AndkitInputModule } from '@andkit/components/other/andkit-input-select/andkit-input.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { DragScrollModule } from '@directives/drag-scroll/drag-scroll.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CoordinatesMainComponent', () => {
  let component: CoordinatesMainComponent;
  let fixture: ComponentFixture<CoordinatesMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoordinatesMainComponent,
        CoordinatesListComponent,
      ],
      imports: [
        CommonModule,
        CoordinatesRoutingModule,
        MatTableModule,
        AndkitModule,
        MatMenuModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule,
        SettingsMultiselectModule,
        AndkitInputModule,
        SafeHtmlModule,
        DragScrollModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [CoordinatesService, EmployeeIdService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
