import { NgModule } from '@angular/core';
import { MaterialSelectComponent } from '@andkit/components/selects/material-select/material-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';


@NgModule({
  declarations: [MaterialSelectComponent],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    SafeHtmlModule
  ],
  exports: [MaterialSelectComponent]
})
export class MaterialSelectModule { }
