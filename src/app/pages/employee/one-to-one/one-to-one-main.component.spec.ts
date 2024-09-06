import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OneToOneMainComponent } from './one-to-one-main.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OneToOneService } from '@services/one-to-one.service';
import { CommonModule } from '@angular/common';
import { OneToOneRoutingModule } from '@pages/employee/one-to-one/one-to-one-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { AndkitModule } from '@andkit/andkit.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AndkitInputModule } from '@andkit/components/other/andkit-input-select/andkit-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OneToOneListComponent } from '@pages/employee/one-to-one/one-to-one-list/one-to-one-list.component';
import { OneToOneRowComponent } from '@pages/employee/one-to-one/one-to-one-list/one-to-one-row/one-to-one-row.component';
import { OneToOneViewModalComponent } from '@pages/employee/one-to-one/one-to-one-view-modal/one-to-one-view-modal.component';
import { OneToOneModalComponent } from '@pages/employee/one-to-one/one-to-one-modal/one-to-one-modal.component';
import { OneToOneConfirmModalComponent } from '@pages/employee/one-to-one/one-to-one-confirm-modal/one-to-one-confirm-modal.component';
import { OneToOneNotFoundComponent } from '@pages/employee/one-to-one/one-to-one-not-found/one-to-one-not-found.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OneToOneMainComponent', () => {
  let component: OneToOneMainComponent;
  let fixture: ComponentFixture<OneToOneMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        OneToOneMainComponent,
        OneToOneListComponent,
        OneToOneRowComponent,
        OneToOneViewModalComponent,
        OneToOneModalComponent,
        OneToOneConfirmModalComponent,
        OneToOneNotFoundComponent,
      ],
      imports: [
        CommonModule,
        OneToOneRoutingModule,
        MatDialogModule,
        MatButtonModule,
        SafeHtmlModule,
        AndkitModule,
        MatAutocompleteModule,
        AndkitInputModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        OneToOneService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneToOneMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
