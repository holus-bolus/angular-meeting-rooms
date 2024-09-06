import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { LoaderModule } from '@andkit/components/other/loader/loader.module';
import { AndkitModule } from '@andkit/andkit.module';
import { SlideTogglerModule } from '@andkit/components/other/slide-toggler/slide-toggler.module';
import { CheckboxModule } from '@andkit/components/other/checkbox/checkbox.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinkModule } from '@pipes/link/link.module';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { BreadcrumbsModule } from '@andkit/components/other/breadcrumbs/breadcrumbs.module';
import { ModalModule } from '@andkit/components/modals/modal/modal.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectEmployeeListModalComponent } from '@pages/employee/project-employee-list-modal/project-employee-list-modal.component';
import { SendCardModalComponent } from '@pages/employee/user-main/send-card-modal/send-card-modal.component';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SurveyModalComponent } from '@pages/employee/user-main/survey-modal/survey-modal.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { ExpertActivitiesModalComponent } from '@pages/expert-activities/expert-activities-modal/expert-activities-modal.component';
import { ExpertActivitiesModule } from '@pages/expert-activities/expert-activities.module';
import { PhoneNumberModule } from '@pipes/phone-number/phone-number.module';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';
import { UserMainRoutingModule } from './user-main-routing.module';
import { UserMainComponent } from './user-main.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserProjectListComponent } from './user-project-list/user-project-list.component';
import { UserExtraMileComponent } from './user-info/user-extra-mile/user-extra-mile.component';
import { UserProjectComponent } from './user-project-list/user-project/user-project.component';
import { UserExtraMileModalComponent } from './user-info/user-extra-mile/user-extra-mile-modal/user-extra-mile-modal.component';
import { SurveySuccessfullyModalComponent } from './survey-successfully-modal/survey-successfully-modal.component';
import { SurveyResultsModalComponent } from './survey-results-modal/survey-results-modal.component';
import { UserExpertActivitiesComponent } from './user-info/user-expert-activities/user-expert-activities.component';
import { UserSkillsAndContactsComponent } from './user-info/user-skills-and-contacts/user-skills-and-contacts.component';

@NgModule({
  declarations: [
    UserMainComponent,
    UserInfoComponent,
    UserProjectListComponent,
    UserExtraMileComponent,
    UserProjectComponent,
    UserExtraMileModalComponent,
    ProjectEmployeeListModalComponent,
    SendCardModalComponent,
    SurveyModalComponent,
    SurveySuccessfullyModalComponent,
    SurveyResultsModalComponent,
    UserExpertActivitiesComponent,
    UserSkillsAndContactsComponent,
  ],
  imports: [
    CommonModule,
    UserMainRoutingModule,
    SafeHtmlModule,
    LoaderModule,
    AndkitModule,
    SlideTogglerModule,
    CheckboxModule,
    ReactiveFormsModule,
    LinkModule,
    TimezoneModule,
    BreadcrumbsModule,
    ModalModule,
    MatDialogModule,
    CKEditorModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatListModule,
    ExpertActivitiesModule,
    PhoneNumberModule,
    OuterClickModule,
  ],
  entryComponents: [
    ProjectEmployeeListModalComponent,
    SendCardModalComponent,
    ConfirmModalComponent,
    SurveyModalComponent,
    SurveySuccessfullyModalComponent,
    SurveyResultsModalComponent,
    ExpertActivitiesModalComponent,
  ],
})
export class UserMainModule {
}
