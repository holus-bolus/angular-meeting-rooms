import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EditMenuComponent } from './edit-menu.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';

describe('EditMenuComponent', () => {
  let component: EditMenuComponent;
  let fixture: ComponentFixture<EditMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ OuterClickModule ],
      declarations: [ EditMenuComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
