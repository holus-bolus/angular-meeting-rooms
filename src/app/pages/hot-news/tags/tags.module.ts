import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags.component';
import {DropdownButtonModule} from '@andkit/components/buttons/dropdown-button/dropdown-button.module';
import {OuterClickModule} from '@directives/outer-click/outer-click.module';
import {IconModule} from '@andkit/components/other/icon/icon.module';

@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule,
    IconModule,
    DropdownButtonModule,
    OuterClickModule,
  ],
  exports: [TagsComponent],
})
export class TagsModule { }
