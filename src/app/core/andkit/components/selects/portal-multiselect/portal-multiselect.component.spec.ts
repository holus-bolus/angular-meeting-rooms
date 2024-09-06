import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PortalMultiselectComponent } from './portal-multiselect.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';

describe('PortalMultiselectComponent', () => {
  let component: PortalMultiselectComponent;
  let fixture: ComponentFixture<PortalMultiselectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalMultiselectComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        OuterClickModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
