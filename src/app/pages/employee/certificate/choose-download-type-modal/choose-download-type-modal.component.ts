import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import html2canvas from 'html2canvas';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import { DEFAULT_FILE_TYPE, DOWNLOAD_FILE_TYPES, FILE_TYPES } from '@pages/employee/certificate/certificate.const';
import { MatRadioChange } from '@angular/material/radio';


@Component({
  selector: 'andteam-choose-download-type-modal',
  templateUrl: './choose-download-type-modal.component.html',
  styleUrls: ['./choose-download-type-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChooseDownloadTypeModalComponent implements OnInit {
  @Output() public closeModal = new EventEmitter<null>();

  public cancelButtonType = BUTTON_TYPES.PREVIOUS;
  public confirmButtonType = BUTTON_TYPES.SUBMIT;
  public fileFormat = DEFAULT_FILE_TYPE;
  public options = DOWNLOAD_FILE_TYPES;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalWindow: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public onRadioButtonChange({ value }: MatRadioChange): void {
    this.fileFormat = value;
  }

  public cancel(): void {
    this.closeModal.emit();
  }

  public download(): void {
    html2canvas(this.data.nativeElement, {
      allowTaint: true,
      scale: 5
    })
      .then((canvas: HTMLCanvasElement) => {
        const img = canvas.toDataURL('image/jpeg', 1);
        switch (this.fileFormat) {
          case FILE_TYPES.PDF: {
            const pdf = new jsPDF('l');
            const imageProps = pdf.getImageProperties(img);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;
            pdf.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('certificate.pdf');
            break;
          }
          case FILE_TYPES.JPG: {
            const url = document.createElement('a');
            url.download = 'certificate.jpg';
            url.href = img;
            url.click();
            break;
          }
        }
      });
    this.closeModal.emit();
  }
}
