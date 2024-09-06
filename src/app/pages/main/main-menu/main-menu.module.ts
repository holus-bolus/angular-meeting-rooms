import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu.component';
import { AutoCompleteModule } from '@andkit/components/selects/autocomplete/autocomplete.module';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';

@NgModule({
  declarations: [MainMenuComponent],
  imports: [
    CommonModule,
    AutoCompleteModule,
    OuterClickModule,
  ],
  exports: [MainMenuComponent]
})
export class MainMenuModule {
}
