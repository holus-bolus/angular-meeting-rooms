import { MatDialog } from '@angular/material/dialog';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PieceNewsCreationComponent } from './piece-news-creation.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { PortalTextareaModule } from '@andkit/components/inputs/portal-textarea/portal-textarea.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PieceNewsCreationComponent', () => {
  let component: PieceNewsCreationComponent;
  let fixture: ComponentFixture<PieceNewsCreationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        PortalTextareaModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
      ],
      declarations: [PieceNewsCreationComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialog, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceNewsCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
