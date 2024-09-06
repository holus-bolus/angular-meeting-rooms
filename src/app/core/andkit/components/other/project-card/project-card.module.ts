import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProjectCardComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [ProjectCardComponent]
})
export class ProjectCardModule { }
