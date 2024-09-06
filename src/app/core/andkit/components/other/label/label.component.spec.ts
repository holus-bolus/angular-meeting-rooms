import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AndkitLabelComponent } from './label.component';
import { RolesService } from '@services/roles.service';
import { Observable, of } from 'rxjs';

class MockedRolesService {
  isNotEmployee$(): Observable<boolean> {
    return of(false);
  }
}

describe('LabelComponent', () => {
  let component: AndkitLabelComponent;
  let fixture: ComponentFixture<AndkitLabelComponent>;
  let rolesService: MockedRolesService;

  beforeEach(waitForAsync(() => {
    rolesService = new MockedRolesService();
    TestBed.configureTestingModule({
      declarations: [AndkitLabelComponent],
      providers: [{ provide: RolesService, useValue: rolesService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndkitLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create LabelComponent', () => {
    expect(component).toBeTruthy();
  });
});
