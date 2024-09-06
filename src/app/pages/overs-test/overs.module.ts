import { NgModule } from '@angular/core';
import { OversComponent } from '@pages/overs-test/overs.component';
import { CommonModule } from '@angular/common';
import { OversRoutingModule } from '@pages/overs-test/overs.routing.module';
import { OvertimeTypesModule } from '@pages/overs-test/overtime-types/overtime-types.module';
import { OversService } from '@pages/overs-test/overs.service';
import { AndkitModule } from '@andkit/andkit.module';
import {
  SubmittedOvertimesTableModule,
} from '@pages/overs-test/submitted-overtimes-table/submitted-overtimes-table.module';
import { OvertimeFormComponent } from './overtime-form/overtime-form.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    OversComponent,
    OvertimeFormComponent,
  ],
  imports: [
    CommonModule,
    OversRoutingModule,
    OvertimeTypesModule,
    AndkitModule,
    SubmittedOvertimesTableModule,
    SafeHtmlModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  providers: [
    OversService,
  ],
  exports: [],
})
export class OversModule {
}
