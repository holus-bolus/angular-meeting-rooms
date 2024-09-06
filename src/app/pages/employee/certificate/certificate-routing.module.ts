import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificateMainComponent } from '@pages/employee/certificate/certificate-main.component';

const routes: Routes = [
  {
    path: '',
    component: CertificateMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateRoutingModule { }
