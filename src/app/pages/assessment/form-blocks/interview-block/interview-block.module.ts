import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewBlockComponent } from './interview-block.component';
import {AssessmentAutocompleteModule} from '@andkit/components/selects/assessment-autocomplete/assessment-autocomplete.module';
import {ButtonModule} from '@andkit/components/buttons/button/button.module';
import {AssessmentMatrixIconModule} from '@andkit/components/other/assessment-matrix-icon/assessment-matrix-icon.module';
import {FormCommentModule} from '@andkit/components/other/form-comment/form-comment.module';
import {DatePickerModule} from '@andkit/components/pickers/date-picker/date-picker.module';
import {CandidateCommonInfoModule} from '@pages/assessment/coordinator-cabinet/candidate-common-info/candidate-common-info.module';
import {AssessmentTimePickerModule} from '@andkit/components/pickers/assessment-time-picker/assessment-time-picker.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [InterviewBlockComponent],
  imports: [
    CommonModule,
    CandidateCommonInfoModule,
    ReactiveFormsModule,
    AssessmentTimePickerModule,
    AssessmentAutocompleteModule,
    FormCommentModule,
    DatePickerModule,
    AssessmentMatrixIconModule,
    ButtonModule,
  ],
  exports: [InterviewBlockComponent]
})
export class InterviewBlockModule { }
