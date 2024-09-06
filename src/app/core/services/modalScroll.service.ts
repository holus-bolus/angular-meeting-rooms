import { Injectable, Renderer2, RendererFactory2, RendererStyleFlags2 } from '@angular/core';

const importantFlag = RendererStyleFlags2.Important;

@Injectable({
  providedIn: 'root'
})
export class ModalScrollService {

  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public disable(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden', importantFlag);
  }

  public enable(): void {
    this.renderer.removeStyle(document.body, 'overflow');
  }
}
