import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalHeaderComponent } from './portal-header.component';
import { RouterModule } from '@angular/router';
import { DropdownMenuModule } from '@andkit/components/other/dropdown-menu/dropdown-menu.module';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';
import { PortalProblemModalModule } from '@andkit/components/modals/portal-problem-modal/portal-problem-modal.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { ModalModule } from '@andkit/components/modals/modal/modal.module';
import { OfficeSelectModule } from '@pages/office-select/office-select.module';
import { MenuModule } from '@andkit/components/other/menu/menu.module';
import { MainMenuModule } from '@pages/main/main-menu/main-menu.module';
import { MatMenuModule } from '@angular/material/menu';
import { LocationModule } from '@pages/location/location.module';

@NgModule({
  declarations: [PortalHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    MainMenuModule,
    PortalProblemModalModule,
    ModalModule,
    DropdownMenuModule,
    OuterClickModule,
    OfficeSelectModule,
    SafeHtmlModule,
    MatMenuModule,
    LocationModule,
  ],
  exports: [PortalHeaderComponent],
})
export class PortalHeaderModule {
}
