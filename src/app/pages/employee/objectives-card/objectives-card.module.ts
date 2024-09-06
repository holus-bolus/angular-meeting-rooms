import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectivesCardRoutingModule } from './objectives-card-routing.module';
import { ObjectivesCardComponent } from './objectives-card.component';
import { ObjectiveCardComponent } from './objective-card/objective-card.component';
import { ObjectivesDateFilterComponent } from './objectives-date-filter/objective-date-filter.component';
import { ObjectivesListComponent } from './objectives-list/objectives-list.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { AndkitModule } from '@andkit/andkit.module';
import { ObjectivesActiveInfoModalComponent } from './objectives-active-info-modal/objectives-active-info-modal.component';
import { ObjectivesArchiveInfoModalComponent } from './objectives-archive-info-modal/objectives-archive-info-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { ObjectivesAddModalComponent } from './objectives-add-modal/objectives-add-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObjectivesNoDataComponent } from './objectives-no-data/objectives-no-data.component';
import {
  AssessmentToastNotificationModule
} from '@andkit/components/other/assessment-toast-notification/assessment-toast-notification.module';
import {
  ObjectiveToArchiveModalComponent
} from '@pages/employee/objectives-card/objective-to-atchive-modal/objective-to-archive-modal.component';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    ObjectivesCardComponent,
    ObjectiveCardComponent,
    ObjectivesDateFilterComponent,
    ObjectivesListComponent,
    ObjectivesActiveInfoModalComponent,
    ObjectivesArchiveInfoModalComponent,
    ObjectivesAddModalComponent,
    ObjectivesNoDataComponent,
    ObjectiveToArchiveModalComponent
  ],
  imports: [
    AndkitModule,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    ObjectivesCardRoutingModule,
    SafeHtmlModule,
    FormsModule,
    ReactiveFormsModule,
    AssessmentToastNotificationModule
  ],
  entryComponents: [
    ObjectivesActiveInfoModalComponent,
    ObjectivesArchiveInfoModalComponent,
    ObjectivesAddModalComponent,
    ObjectiveToArchiveModalComponent,
    ConfirmModalComponent
  ]
})
export class ObjectivesCardModule {
}
