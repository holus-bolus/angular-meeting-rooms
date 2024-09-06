import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropFileLoaderComponent } from './drag-and-drop-file-loader.component';

describe('DragAndDropFileLoaderComponent', () => {
  let component: DragAndDropFileLoaderComponent;
  let fixture: ComponentFixture<DragAndDropFileLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndDropFileLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropFileLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
