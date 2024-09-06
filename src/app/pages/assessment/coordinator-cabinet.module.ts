import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatorCabinetRoutingModule } from './coordinator-cabinet-routing.module';
import { CoordinatorCabinetComponent } from './coordinator-cabinet/coordinator-cabinet.component';
import { ApprovedPageModule } from './pages/approved-page/approved-page.module';
import { CandidatesListModule } from './coordinator-cabinet/candidates-list/candidates-list.module';
import { ProgressPageModule } from './pages/progress-page/progress-page.module';
import { ReadyPageModule } from './pages/ready-page/ready-page.module';
import { CandidateCommonInfoModule } from './coordinator-cabinet/candidate-common-info/candidate-common-info.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { AndkitModule } from '@andkit/andkit.module';

@NgModule({
  declarations: [CoordinatorCabinetComponent],
  imports: [
    AndkitModule,
    CommonModule,
    CoordinatorCabinetRoutingModule,
    ApprovedPageModule,
    CandidatesListModule,
    ProgressPageModule,
    ReadyPageModule,
    CandidateCommonInfoModule,
    SafeHtmlModule,
    TimezoneModule,
  ],
})
export class CoordinatorCabinetModule {
}
