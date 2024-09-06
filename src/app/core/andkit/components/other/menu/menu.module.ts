import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { DropdownButtonModule } from '@andkit/components/buttons/dropdown-button/dropdown-button.module';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    OuterClickModule,
    DropdownButtonModule,
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
