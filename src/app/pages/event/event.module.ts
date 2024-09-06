import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { EventRoutingModule } from './event.routing.module';
import {TimezoneModule} from '@pipes/timezone/timezone.module';
import {AndkitModule} from '@andkit/andkit.module';
import {PortalBackwardLinkModule} from '@andkit/components/buttons/portal-backward-link/portal-backward-link.module';
import {PunctuationTitleModule} from '@directives/punctuation-title/punctuation-title.module';
import {TruncatePipeModule} from '@pipes/truncate/truncate.pipe.module';
import {SafeHtmlModule} from '@pipes/safe-html/safe-html.module';
import {EditorContentModule} from '@pages/editor-content/editor-content.module';

@NgModule({
  declarations: [EventComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    TruncatePipeModule,
    PortalBackwardLinkModule,
    AndkitModule,
    EditorContentModule,
    TimezoneModule,
    PunctuationTitleModule,
    SafeHtmlModule,
  ]
})
export class EventModule {
}
