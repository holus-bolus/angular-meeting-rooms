import { CertificateDateModule } from './../../../pipes/certificate-date/certificate-date.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateRoutingModule } from './certificate-routing.module';
import { CertificateMainComponent } from './certificate-main.component';
import { CertificateViewComponent } from './certificate-view/certificate-view.component';
import { CertificateModalHrViewComponent } from './certificate-modal-hr-view/certificate-modal-hr-view.component';
import { CertificateModalViewComponent } from './certificate-modal-view/certificate-modal-view.component';
import { CertificateModalEditComponent } from './certificate-modal-edit/certificate-modal-edit.component';
import { CertificateService } from '@services/certificate.service';
import { VacationsModule } from '@pages/employee/planned-vacations/planned-vacations.module';
import { PortalInputModule } from '@andkit/components/inputs/portal-input/portal-input.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePickerModule } from '@andkit/components/pickers/date-picker/date-picker.module';
import { SelectModule } from '@andkit/components/selects/select/select.module';
import { PortalTextareaModule } from '@andkit/components/inputs/portal-textarea/portal-textarea.module';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import {
  ChooseDownloadTypeModalComponent
} from '@pages/employee/certificate/choose-download-type-modal/choose-download-type-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { ActionSelectorModule } from '@andkit/components/selects/action-selector/action-selector.module';
import {
  AssessmentToastNotificationModule
} from '@andkit/components/other/assessment-toast-notification/assessment-toast-notification.module';
import { AndkitModule } from '@andkit/andkit.module';
import { NgxPrinterModule, NgxPrinterService } from 'ngx-printer';
import { AutoCompleteModule } from '@andkit/components/selects/search-autocomplete/search-autocomplete.module';
import { PrintService } from '@services/print.service';

@NgModule({
  declarations: [
    CertificateMainComponent,
    CertificateViewComponent,
    CertificateModalHrViewComponent,
    CertificateModalViewComponent,
    CertificateModalEditComponent,
    ChooseDownloadTypeModalComponent
  ],
  imports: [
    CommonModule,
    CertificateRoutingModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    ButtonModule,
    VacationsModule,
    PortalInputModule,
    ReactiveFormsModule,
    DatePickerModule,
    SelectModule,
    PortalTextareaModule,
    SafeHtmlModule,
    ActionSelectorModule,
    AssessmentToastNotificationModule,
    AndkitModule,
    NgxPrinterModule.forRoot({ timeToWaitRender: 1000 }),
    AutoCompleteModule,
    CertificateDateModule
  ],
  providers: [
    CertificateService,
    NgxPrinterService,
    PrintService
  ],
  entryComponents: [
    ChooseDownloadTypeModalComponent,
    CertificateModalEditComponent,
    CertificateModalViewComponent,
    CertificateModalHrViewComponent
  ]
})
export class CertificateModule { }
