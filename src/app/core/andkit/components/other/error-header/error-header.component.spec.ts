import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ErrorHeaderComponent } from './error-header.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ErrorHeaderComponent', () => {
  let component: ErrorHeaderComponent;
  let fixture: ComponentFixture<ErrorHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })],
      declarations: [ ErrorHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
