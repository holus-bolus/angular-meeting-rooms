import { NgModule } from '@angular/core';
import { OfficeListComponent } from './office-list/office-list.component';
import { CommonModule } from '@angular/common';
import { OfficeSelectorComponent } from './office-selector/office-selector.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { OfficeSelectorWrapperComponent } from './office-selector-wrapper/office-selector-wrapper.component';
import { DefaultOfficeLandingComponent } from './default-office-landing/default-office-landing.component';

@NgModule({
    imports: [
        CommonModule,
        SafeHtmlModule,
    ],
    declarations: [
        OfficeListComponent,
        OfficeSelectorComponent,
        OfficeSelectorWrapperComponent,
        DefaultOfficeLandingComponent,
    ],
    exports: [
        OfficeListComponent,
        OfficeSelectorComponent,
        OfficeSelectorWrapperComponent,
        DefaultOfficeLandingComponent,
    ]
})
export class OfficeSelectModule { }
