import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee.routing.module';
import { EmployeeComponent } from './employee.component';
import { AndkitModule } from '@andkit/andkit.module';
import { UserMainModule } from './user-main/user-main.module';
import { UserMainRoutingModule } from './user-main/user-main-routing.module';

@NgModule({
  imports: [
    AndkitModule,
    CommonModule,
    EmployeeRoutingModule,
    UserMainModule,
    UserMainRoutingModule
  ],
  declarations: [EmployeeComponent],
})
export class EmployeeModule {
}
