import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrixModalComponent } from './matrix-modal.component';
import { EmployeeMatrixModalComponent } from './employee-matrix-modal/employee-matrix-modal.component';
import {ProgressSpinnerModule} from '@andkit/components/other/progress-spinner/progress-spinner.module';
import {ButtonModule} from '@andkit/components/buttons/button/button.module';
import {AssessmentModalModule} from '@andkit/components/modals/assessment-modal/assessment-modal.module';
import {SafeHtmlModule} from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [MatrixModalComponent, EmployeeMatrixModalComponent],
  imports: [
    CommonModule,
    AssessmentModalModule,
    SafeHtmlModule,
    ButtonModule,
    ProgressSpinnerModule
  ],
  exports: [MatrixModalComponent, EmployeeMatrixModalComponent]
})
export class MatrixModalModule { }
