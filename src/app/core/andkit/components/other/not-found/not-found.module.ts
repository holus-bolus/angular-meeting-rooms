import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { CardModule } from '@andkit/components/other/card/card.module';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';

@NgModule({
  imports: [CommonModule, ButtonModule, CardModule],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent]
})
export class NotFoundModule { }
