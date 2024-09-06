import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { NgxPrinterService } from 'ngx-printer';

@Injectable()
export class PrintService {
  constructor(private printService: NgxPrinterService) { }

  printImage(element: HTMLElement): void {
    html2canvas(element, {
      allowTaint: true,
      scale: 1.35
    })
      .then((canvas: HTMLCanvasElement) => {
        const img = canvas.toDataURL('image/jpeg', 1);
        this.printService.printImg(img);
      });
  }
}
