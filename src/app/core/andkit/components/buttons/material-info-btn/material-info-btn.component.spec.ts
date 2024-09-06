import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MaterialInfoBtnComponent } from './material-info-btn.component';

describe('MaterialInfoBtnComponent', () => {
  let component: MaterialInfoBtnComponent;
  let fixture: ComponentFixture<MaterialInfoBtnComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialInfoBtnComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialInfoBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
