import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesListComponent } from './candidates-list.component';
import { CandidateModule } from '../candidate/candidate.module';
import { FiltersListModule } from '../filters-list/filters-list.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';
import { AndkitModule } from '@andkit/andkit.module';

@NgModule({
  declarations: [CandidatesListComponent],
  imports: [
    AndkitModule,
    CommonModule,
    CandidateModule,
    FiltersListModule,
    ReactiveFormsModule,
    ScrollingModule,
    OuterClickModule
  ],
  exports: [CandidatesListComponent]
})
export class CandidatesListModule {
}
