import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrInterviewComponent } from './hr-interview.component';
import { HrInterviewRoutingModule } from './hr-interview-routing.module';
import { AndkitModule } from '@andkit/andkit.module';
import { HrInterviewAnswersComponent } from './hr-interview-answers/hr-interview-answers.component';
import { HrInterviewFormComponent } from './hr-interview-form/hr-interview-form.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { HrInterviewModalComponent } from './hr-interview-modal/hr-interview-modal.component';
import { HrInterviewService } from '@services/hr-interview.service';

@NgModule({
  imports: [
    CommonModule,
    HrInterviewRoutingModule,
    AndkitModule,
    SafeHtmlModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
  ],
  declarations: [HrInterviewComponent, HrInterviewAnswersComponent, HrInterviewFormComponent, HrInterviewModalComponent],
  providers: [HrInterviewService],
  entryComponents: [HrInterviewModalComponent]
})
export class HrInterviewModule { }
