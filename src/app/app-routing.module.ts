import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { RolesGuard } from '@guards/roles.guard';
import { ForbiddenPageComponent } from '@andkit/components/other/forbidden-page/forbidden-page.component';
import { NotFoundPageComponent } from '@andkit/components/other/not-found-page/not-found-page.component';
import { OfficeLandingDeactivateGuard } from '@guards/office-landing-deactivate.guard';
import { DefaultOfficeLandingComponent } from '@pages/office-select/default-office-landing/default-office-landing.component';
import { OfficeDefinedGuard } from '@guards/office-defined.guard';
import { ExternalFeedbackComponent } from '@pages/external-feedback/external-feedback.component';
import { CompanyDefinedGuard } from '@guards/company-defined.guard';
import { SalaryInvoiceGuard } from '@guards/salary-invoice.guard';
import { EmployeeResolve } from '@resolvers/employee.resolve';
import { ProjectFeedbacksResolve } from '@resolvers/project-feedbacks.resolve';
import { ProjectFeedbackGuard } from '@guards/project-feedback.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [OfficeDefinedGuard],
        loadChildren: () => import('./pages/main/main/main.module').then(m => m.MainModule),
        data: { name: 'main' },
      },
      {
        path: 'merch',
        canActivate: [RolesGuard, CompanyDefinedGuard],
        loadChildren: () => import('@pages/merch-page/merch-page.module').then(m => m.MerchPageModule),
        data: { name: 'merch' },
      },
      {
        path: 'employee',
        canActivate: [RolesGuard],
        loadChildren: () => import('./pages/employee/employee.module').then(m => m.EmployeeModule),
        data: { name: 'employee' },
        resolve: {
          employee: EmployeeResolve,
        },
      },
      {
        path: 'employee-list',
        canActivate: [RolesGuard],
        loadChildren: () => import('./pages/employees-list/employees-list.module').then(m => m.EmployeesListModule),
        data: { name: 'employee-list' },
      },
      {
        path: 'expert-activities',
        canActivate: [RolesGuard],
        loadChildren: () => import('./pages/expert-activities/expert-activities.module').then(m => m.ExpertActivitiesModule),
        data: { name: 'expert-activities' },
      },
      {
        path: 'hot-news',
        loadChildren: () => import('./pages/hot-news/hot-news/hot-news.module').then(m => m.HotNewsModule),
        data: { name: 'hot-news' },
      },
      {
        path: 'hot-news/:id',
        loadChildren: () => import('./pages/piece-news/piece-news/piece-news.module').then(m => m.PieceNewsModule),
        data: { name: 'piece-news' },
      },
      {
        path: 'add-news',
        canActivate: [RolesGuard],
        loadChildren: () => import('./pages/piece-news-creation/piece-news-creation.module').then(m => m.PieceNewsCreationModule),
        data: { name: 'add-news' },
      },
      {
        path: 'edit-news/:id',
        canActivate: [RolesGuard],
        loadChildren: () => import('./pages/piece-news-creation/piece-news-creation.module').then(m => m.PieceNewsCreationModule),
        data: { name: 'edit-news' },
      },
      {
        path: 'add-event',
        canActivate: [RolesGuard],
        loadChildren: () => import('./pages/create-event/create-event.module').then(m => m.CreateEventModule),
        data: { name: 'add-event' },
      },
      {
        path: 'edit-event/:id',
        canActivate: [RolesGuard],
        loadChildren: () => import('./pages/create-event/create-event.module').then(m => m.CreateEventModule),
        data: { name: 'edit-event' },
      },
      {
        path: 'event',
        canActivate: [OfficeDefinedGuard],
        loadChildren: () => import('./pages/event/event.module').then(m => m.EventModule),
        data: { name: 'event' },
      },
      {
        path: 'assessment',
        canActivate: [RolesGuard],
        loadChildren:
          () => import('./pages/assessment/coordinator-cabinet.module').then(m => m.CoordinatorCabinetModule),
        data: { name: 'assessment' },
      },
      {
        path: 'set-default-office',
        canDeactivate: [OfficeLandingDeactivateGuard],
        component: DefaultOfficeLandingComponent,
      },
      {
        path: 'employee/:id/feedback',
        loadChildren: () => import('./pages/feedback/feedback.module').then(m => m.FeedbackModule),
        data: { name: 'feedback' },
      },
      {
        path: 'employee/:id/feedback/:feedbackId',
        loadChildren: () => import('./pages/feedback/feedback.module').then(m => m.FeedbackModule),
        data: { name: 'feedback' },
      },
      {
        path: 'employee/:id/projectfeedback/:projectId',
        loadChildren: () => import('./pages/feedback-on-project/feedback-on-project.module').then(m => m.FeedbackOnProjectModule),
        data: { name: 'projectfeedback' },
      },
      {
        path: 'project-feedbacks',
        loadChildren: () => import('@pages/project-feedbacks/project-feedbacks.module').then(m => m.ProjectFeedbacksModule),
        data: { name: 'project-feedbacks' },
        canActivate: [ProjectFeedbackGuard],
        resolve: {
          projectFeedbacks: ProjectFeedbacksResolve,
        },
      },
      {
        path: 'project-feedbacks/:projectId',
        loadChildren: () => import('@pages/project-feedbacks-by-project/project-feedbacks-by-project.module')
          .then(m => m.ProjectFeedbacksByProjectModule),
        data: { name: 'project-feedbacks-by-project' },
        canActivate: [ProjectFeedbackGuard],
      },
      {
        path: 'questionnaires/:id/questions',
        loadChildren: () => import('./pages/hr-interview/hr-interview.module').then(m => m.HrInterviewModule),
        data: { name: 'questionnaires' },
      },
      {
        path: 'salary-invoice',
        loadChildren: () => import('@pages/salary-invoice/salary-invoice.module').then(m => m.SalaryInvoiceModule),
        canActivate: [SalaryInvoiceGuard],
        data: { name: 'salary-invoice' },
      },
      {
        path: 'overtime',
        loadChildren: () => import('@pages/overs-test/overs.module').then(m => m.OversModule),
        data: { name: 'overtime' },
      },
      {
        path: 'meeting-rooms',
        loadChildren: () => import('@pages/meeting-rooms/meeting-rooms.module').then(m => m.MeetingRoomsModule),
        data: { name: 'meetings-room' },
      },
    ],
  },
  {
    path: 'feedbackexternals/:id',
    component: ExternalFeedbackComponent,
  },
  {
    path: '403',
    component: ForbiddenPageComponent,
    data: { name: 'forbidden-page' },
  },
  {
    path: '404',
    component: NotFoundPageComponent,
    data: { name: 'not-found-page' },
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
