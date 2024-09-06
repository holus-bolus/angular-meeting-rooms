import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryReviewCardRoutingModule } from './salary-review-card-routing.module';
import { SalaryReviewCardComponent } from './salary-review-card.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import {TimezoneModule} from '@pipes/timezone/timezone.module';
import {AndkitModule} from '@andkit/andkit.module';
import {SafeHtmlModule} from '@pipes/safe-html/safe-html.module';
import {AssessmentTooltipModule} from '@andkit/components/other/assessment-tooltip/assessment-tooltip.module';
import {LinkModule} from '@pipes/link/link.module';
import {MatrixModalModule} from '@pages/employee/matrix-modal/matrix-modal.module';

@NgModule({
  declarations: [SalaryReviewCardComponent, ReviewCardComponent],
  imports: [
    CommonModule,
    SalaryReviewCardRoutingModule,
    MatrixModalModule,
    AndkitModule,
    AssessmentTooltipModule,
    TimezoneModule,
    SafeHtmlModule,
    LinkModule
  ]
})
export class SalaryReviewCardModule {}
