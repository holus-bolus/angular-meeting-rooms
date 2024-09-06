import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieceNewsCreationComponent } from './piece-news-creation.component';
import { PieceNewsCreationRoutingModule } from './piece-news-creation.routing.module';
import {BlockCreationModule} from '@pages/block-creation/block-creation.module';
import {PortalSelectedFiltersModule} from '@andkit/components/other/portal-selected-filters/portal-selected-filters.module';
import {PortalSelectModule} from '@andkit/components/selects/portal-select/portal-select.module';
import {PortalTextareaModule} from '@andkit/components/inputs/portal-textarea/portal-textarea.module';
import {ChipsAutocompleteModule} from '@andkit/components/selects/chips-autocomplete/chips-autocomplete.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [PieceNewsCreationComponent],
  imports: [
    CommonModule,
    BlockCreationModule,
    PieceNewsCreationRoutingModule,
    PortalSelectedFiltersModule,
    PortalSelectModule,
    ChipsAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    PortalTextareaModule,
  ],
  exports: [PieceNewsCreationComponent]
})
export class PieceNewsCreationModule { }
