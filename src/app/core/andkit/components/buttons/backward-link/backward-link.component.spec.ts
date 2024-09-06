import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {SafeHtmlModule} from '@pipes/safe-html/safe-html.module';
import {BackwardLinkComponent} from '@andkit/components/buttons/backward-link/backward-link.component';

describe('BackwardLinkComponent', () => {
  let component: BackwardLinkComponent;
  let fixture: ComponentFixture<BackwardLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ SafeHtmlModule, RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }) ],
      declarations: [ BackwardLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackwardLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
