import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {AndkitButtonComponent} from '@andkit/components/buttons/button/button.component';

describe('ButtonComponent', () => {
  let component: AndkitButtonComponent;
  let fixture: ComponentFixture<AndkitButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AndkitButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndkitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
