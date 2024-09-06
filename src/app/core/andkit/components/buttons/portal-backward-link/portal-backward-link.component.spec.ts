import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {PortalBackwardLinkComponent} from '@andkit/components/buttons/portal-backward-link/portal-backward-link.component';

describe('PortalBackwardLinkComponent', () => {
  let component: PortalBackwardLinkComponent;
  let fixture: ComponentFixture<PortalBackwardLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }) ],
      declarations: [ PortalBackwardLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalBackwardLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
