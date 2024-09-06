import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentDatepickerComponent } from './assessment-datepicker.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { TruncatePipeModule } from '@pipes/truncate/truncate.pipe.module';
import { ControlPanelComponent } from './control-panel/control-panel.component';

@NgModule({
  declarations: [AssessmentDatepickerComponent, ControlPanelComponent],
  imports: [
    CommonModule,
    SafeHtmlModule,
    TruncatePipeModule
  ],
  exports: [AssessmentDatepickerComponent]
})
export class AssessmentDatepickerModule { }
