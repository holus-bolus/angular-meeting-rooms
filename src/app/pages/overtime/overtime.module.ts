import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OvertimeComponent } from './overtime.component';
import { OvertimeRoutingModule } from './overtime.routing.module';
import { AddOvertimeModalComponent } from './add-overtime-modal/add-overtime-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewOvertimeModalComponent } from './view-overtime-modal/view-overtime-modal.component';
import { TableWrapperComponent } from './table-wrapper/table-wrapper.component';
import { AndkitModule } from '@andkit/andkit.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { OvertimesTableComponent } from './overtimes-table/overtimes-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TextLengthModule } from '@pipes/text-length/text-length.module';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { UrlifyPipeModule } from '@pipes/urlify/urlify.pipe.module';
import { ScrollModule } from '@directives/scroll/scroll.module';

@NgModule({
    declarations: [
        OvertimeComponent,
        AddOvertimeModalComponent,
        ViewOvertimeModalComponent,
        TableWrapperComponent,
        OvertimesTableComponent
    ],
    exports: [
        OvertimeComponent
    ],
    imports: [
        AndkitModule,
        CommonModule,
        FormsModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        MatTooltipModule,
        OvertimeRoutingModule,
        ReactiveFormsModule,
        SafeHtmlModule,
        TextFieldModule,
        TextLengthModule,
        MatSelectModule,
        MatButtonModule,
        UrlifyPipeModule,
        ScrollModule,
    ]
})
export class OvertimeModule {
}
