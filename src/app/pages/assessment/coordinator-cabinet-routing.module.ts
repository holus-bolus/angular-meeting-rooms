import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoordinatorCabinetComponent } from './coordinator-cabinet/coordinator-cabinet.component';
import { NotFoundPageComponent } from '@andkit/components/other/not-found-page/not-found-page.component';

const childrenRoutes = [
  {
    path: 'approved',
    loadChildren: () => import('./pages/approved-page/approved-page.module').then(m => m.ApprovedPageModule),
    name: 'approved',
  },
  {
    path: 'interview',
    loadChildren: () => import('./pages/progress-page/progress-page.module').then(m => m.ProgressPageModule),
    name: 'interview',
  },
  {
    path: 'preparation',
    loadChildren: () => import('./pages/progress-page/progress-page.module').then(m => m.ProgressPageModule),
    name: 'preparation',
  },
  {
    path: 'ready',
    loadChildren: () => import('./pages/ready-page/ready-page.module').then(m => m.ReadyPageModule),
    name: 'ready',
  },
];

const routes: Routes = [
  {
    path: '',
    component: CoordinatorCabinetComponent,
    children: childrenRoutes
  },
  {
    path: '**',
    component: NotFoundPageComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CoordinatorCabinetRoutingModule { }
