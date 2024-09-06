import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentModalComponent } from './assessment-modal.component';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { IconModule } from '@andkit/components/other/icon/icon.module';

@NgModule({
  declarations: [AssessmentModalComponent],
  imports: [
    CommonModule,
    SafeHtmlModule,
    IconModule,
    OuterClickModule
  ],
  exports: [AssessmentModalComponent]
})
export class AssessmentModalModule {
}
