import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyDefinedGuard } from '@guards/company-defined.guard';
import { EmployeeTabGuard } from '@guards/employee-tab-guard';
import { EmployeeComponent } from './employee.component';
import { UserMainComponent } from './user-main/user-main.component';

const childrenRoutes = [
  {
    path: '',
    redirectTo: 'personal-info',
  },
  {
    path: 'personal-info',
    component: UserMainComponent,
  },
  {
    path: 'salary-review',
    loadChildren: () => import('./salary-review-card/salary-review-card.module').then(m => m.SalaryReviewCardModule),
    name: 'salary-review',
  },
  {
    path: 'interview',
    loadChildren: () => import('./interviews-card/interviews-card.module').then(m => m.InterviewsCardModule),
    name: 'interview',
  },
  {
    path: 'objectives',
    loadChildren: () => import('./objectives-card/objectives-card.module').then(m => m.ObjectivesCardModule),
    name: 'objectives',
  },
  {
    path: 'feedback-view',
    loadChildren: () => import('./feedback-view/feedback-view.module').then(m => m.FeedbackViewModule),
    name: 'feedback-view',
  },
  {
    path: 'one-to-one',
    loadChildren: () => import('./one-to-one/one-to-one.module').then(m => m.OneToOneModule),
    name: 'one-to-one',
  },
  {
    path: 'coordinates',
    loadChildren: () => import('./coordinates/coordinates.module').then(m => m.CoordinatesModule),
    name: 'coordinates',
  },
  {
    path: 'planned-vacations',
    canActivate: [CompanyDefinedGuard],
    loadChildren: () => import('./planned-vacations/planned-vacations.module').then(m => m.VacationsModule),
    name: 'planned-vacations',
  },
  {
    path: 'certificates',
    loadChildren: () => import('./certificate/certificate.module').then(m => m.CertificateModule),
    name: 'certificates',
  },
  {
    path: 'feedback-on-project-view',
    loadChildren: () => import('./feedback-on-project-view/feedback-on-project-view.module').then(m => m.FeedbackOnProjectViewModule),
    name: 'feedback-on-project-view',
  },
];

const routes: Routes = [
  {
    path: ':id',
    component: EmployeeComponent,
    children: childrenRoutes,
    canActivateChild: [EmployeeTabGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EmployeeTabGuard],
})
export class EmployeeRoutingModule {
}
