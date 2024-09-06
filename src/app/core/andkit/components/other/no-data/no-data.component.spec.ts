import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoDataComponent } from './no-data.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('NoDataComponent', () => {
  let component: NoDataComponent;
  let fixture: ComponentFixture<NoDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDataComponent ],
      imports: [ SafeHtmlModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
