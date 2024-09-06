import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadyPageComponent } from './ready-page.component';
import {InterviewBlockModule} from '@pages/assessment/form-blocks/interview-block/interview-block.module';
import {FormCommentModule} from '@andkit/components/other/form-comment/form-comment.module';
import {ReadyPageRoutingModule} from '@pages/assessment/pages/ready-page/ready-page-routing.module';
import {FormComponentsModule} from '@pages/assessment/form-components/form-components.module';
import {DatePickerModule} from '@andkit/components/pickers/date-picker/date-picker.module';
import {CandidateCommonInfoModule} from '@pages/assessment/coordinator-cabinet/candidate-common-info/candidate-common-info.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FormFieldModule} from '@andkit/components/other/form-field/form-field.module';

@NgModule({
  declarations: [ReadyPageComponent],
  imports: [
    CommonModule,
    CandidateCommonInfoModule,
    FormCommentModule,
    DatePickerModule,
    InterviewBlockModule,
    ReactiveFormsModule,
    FormComponentsModule,
    FormFieldModule,
    ReadyPageRoutingModule
  ],
  exports: [ReadyPageComponent]
})
export class ReadyPageModule { }
