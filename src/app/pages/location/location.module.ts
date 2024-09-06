import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from '@pages/location/location.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { AutoCompleteModule } from '@andkit/components/selects/autocomplete/autocomplete.module';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';
import { LocationModalComponent } from './location-modal/location-modal.component';

@NgModule({
  declarations: [LocationComponent, LocationModalComponent],
  imports: [
    CommonModule,
    SafeHtmlModule,
    AutoCompleteModule,
    ButtonModule,
  ],
  exports: [LocationComponent],
})
export class LocationModule {
}
