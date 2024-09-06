import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentComponent } from './assessment.component';
import { ReactiveFormsModule } from '@angular/forms';
import {ApprovedAssessmentModule} from '@pages/assessment/form-blocks/approved-assessment/approved-assessment.module';
import {TimezoneModule} from '@pipes/timezone/timezone.module';
import {AssessmentAutocompleteModule} from '@andkit/components/selects/assessment-autocomplete/assessment-autocomplete.module';
import {PortalSelectModule} from '@andkit/components/selects/portal-select/portal-select.module';
import {ButtonModule} from '@andkit/components/buttons/button/button.module';
import {AssessmentMatrixIconModule} from '@andkit/components/other/assessment-matrix-icon/assessment-matrix-icon.module';
import {FormCommentModule} from '@andkit/components/other/form-comment/form-comment.module';
import {SafeHtmlModule} from '@pipes/safe-html/safe-html.module';
import {DatePickerModule} from '@andkit/components/pickers/date-picker/date-picker.module';
import {CandidateCommonInfoModule} from '@pages/assessment/coordinator-cabinet/candidate-common-info/candidate-common-info.module';
import {AssessmentTimePickerModule} from '@andkit/components/pickers/assessment-time-picker/assessment-time-picker.module';

@NgModule({
  declarations: [AssessmentComponent],
    imports: [
        CommonModule,
        CandidateCommonInfoModule,
        FormCommentModule,
        AssessmentMatrixIconModule,
        ButtonModule,
        AssessmentAutocompleteModule,
        PortalSelectModule,
        SafeHtmlModule,
        DatePickerModule,
        AssessmentTimePickerModule,
        ReactiveFormsModule,
        ApprovedAssessmentModule,
        TimezoneModule,
    ],
  exports: [AssessmentComponent]
})
export class AssessmentsModule { }
