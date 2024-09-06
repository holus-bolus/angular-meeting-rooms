import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatesRoutingModule } from './coordinates-routing.module';
import { CoordinatesMainComponent } from './coordinates-main.component';
import { CoordinatesListComponent } from './coordinates-list/coordinates-list.component';
import { MatTableModule } from '@angular/material/table';
import { AndkitModule } from '@andkit/andkit.module';
import { CoordinatesService } from '@services/coordinates.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsMultiselectModule } from '@andkit/components/other/settings-multiselect/settings-multiselect.module';
import { AndkitInputModule } from '@andkit/components/other/andkit-input-select/andkit-input.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { DragScrollModule } from '@directives/drag-scroll/drag-scroll.module';

@NgModule({
  declarations: [
    CoordinatesMainComponent,
    CoordinatesListComponent,
  ],
  imports: [
    CommonModule,
    CoordinatesRoutingModule,
    MatTableModule,
    AndkitModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    SettingsMultiselectModule,
    AndkitInputModule,
    SafeHtmlModule,
    DragScrollModule
  ],
  entryComponents: [],
  providers: [
    CoordinatesService
  ]
})
export class CoordinatesModule { }
