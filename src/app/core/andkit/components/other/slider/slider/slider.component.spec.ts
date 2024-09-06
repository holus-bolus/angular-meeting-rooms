import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SliderComponent } from './slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { AnimationBuilder } from '@angular/animations';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {SlideItemDirective} from '@andkit/components/other/slider/slide-item.directive';

@Component({
  selector: 'andteam-test-slider',
  template: `
    <div #slide></div>
  `
})
class TestSliderComponent extends SliderComponent {
}

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<TestSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SliderComponent, SlideItemDirective, TestSliderComponent],
      imports: [FormsModule, SafeHtmlModule, ReactiveFormsModule],
      providers: [AnimationBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSliderComponent);
    component = fixture.componentInstance;
    component.amountOfItems = 2;
    component.itemsPerSlide = 2;
    component.slideItemsGap = '25px';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
