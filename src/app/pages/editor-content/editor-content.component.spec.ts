import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EditorContentComponent } from './editor-content.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('EditorContentComponent', () => {
  let component: EditorContentComponent;
  let fixture: ComponentFixture<EditorContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorContentComponent ],
      imports: [ SafeHtmlModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
