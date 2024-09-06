import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateDatePipe } from './certificate-date.pipe';



@NgModule({
  declarations: [
    CertificateDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CertificateDatePipe
  ]
})
export class CertificateDateModule { }
