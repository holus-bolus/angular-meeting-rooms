import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
  ViewChild,
  ElementRef, OnDestroy, EventEmitter, Output
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { BehaviorSubject, from, Subject, throwError } from 'rxjs';
import { BUTTON_NAMES } from '@pages/employee/user-main/user-main.const';
import { BlurEvent, CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';
import { EmployeeService } from '@services/employee.service';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import * as customEditor from '@assets/CKEditor5/build/ckeditor';
import closeSvg from '!!raw-loader!@assets/images/close.svg';
import html2canvas from 'html2canvas';

@Component({
  selector: 'andteam-send-card-modal',
  templateUrl: './send-card-modal.component.html',
  styleUrls: ['./send-card-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SendCardModalComponent implements OnInit, OnDestroy {
  @Output() afterPostCardSend = new EventEmitter<string>();

  public closeIcon: string = closeSvg;
  public buttonSecondary = BUTTON_TYPES.PREVIOUS;
  public leftButtonName$ = new BehaviorSubject<string>(BUTTON_NAMES.leftStart);
  public rightButtonName$ = new BehaviorSubject<string>(BUTTON_NAMES.rightStart);
  public isStartWindow$ = new BehaviorSubject<boolean>(true);
  public isShowLoader$ = new BehaviorSubject<boolean>(false);
  public isButtonDisable$ = new BehaviorSubject<boolean>(false);
  public cardNumber = 0;
  public classicEditor: CKEditor5.EditorConstructor = customEditor;
  public editorText = '';
  public componentsType = COMPONENT_TYPES.OVERTIME;
  public nameText = '';
  public namePlaceholder = 'Your name';
  public ckEditorPlaceholder = 'Input your text (100 symbols limit)';
  public capturedImage = new BehaviorSubject(null);
  public editorConfig = {
    wordCountConfig: {
      displayCharacters: true
    },
    toolbar: {
      items: [
        'bold',
        'italic',
        'underline',
        'emoji',
        'undo',
        'redo'
      ],
      shouldNotGroupWhenFull: true,
    },
    emoji: [
      { name: '1', text: '💋' },
      { name: '3', text: '💓' },
      { name: '4', text: '💕' },
      { name: '5', text: '💞' },
      { name: '6', text: '💌' },
      { name: '7', text: '😍' },
      { name: '8', text: '😘' },
      { name: '9', text: '😚' },
      { name: '10', text: '🙂' },
      { name: '11', text: '😻' },
      { name: '12', text: '🐰' },
      { name: '13', text: '🐁' },
      { name: '14', text: '🌸' },
      { name: '15', text: '🌷' },
      { name: '16', text: '🍾' },
      { name: '17', text: '🍷' },
      { name: '18', text: '🍸' },
    ],
  };

  @ViewChild('capture') capture: ElementRef;

  private destroy$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      cards: string[];
      userId: string[];
      shortName: string;
      defaultText: string;
      celebrationId: string;
    },
    private modalWindow: MatDialog,
    private employeeService: EmployeeService,
  ) { }

  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onEditorBlur({ editor }: BlurEvent): void {
    this.editorText = editor.getData();
  }

  public onLeftButtonClick(buttonName: string): void {
    if (buttonName === BUTTON_NAMES.leftStart) {
      this.isStartWindow$.next(false);
      this.leftButtonName$.next(BUTTON_NAMES.leftLast);
      this.rightButtonName$.next(BUTTON_NAMES.rightLast);
    }

    if (buttonName === BUTTON_NAMES.leftLast) {
      this.prepareImage();
    }
  }

  public onRightButtonClick(buttonName: string): void {
    if (buttonName === BUTTON_NAMES.rightStart) {
      this.modalWindow.closeAll();
    }

    if (buttonName === BUTTON_NAMES.rightLast) {
      this.isStartWindow$.next(true);
      this.leftButtonName$.next(BUTTON_NAMES.leftStart);
      this.rightButtonName$.next(BUTTON_NAMES.rightStart);
    }
  }

  public chooseCard(index: number): void {
    this.cardNumber = index;
  }

  private prepareImage(): void {
    this.isButtonDisable$.next(true);
    this.isShowLoader$.next(true);

    from(html2canvas(this.capture.nativeElement))
      .pipe(
        takeUntil(this.destroy$),
        switchMap((canvas: HTMLCanvasElement) => from(fetch(canvas.toDataURL('image/jpeg')))),
        switchMap((res: Response) => from(res.blob())),
        switchMap((blob: Blob) => {
          const file = new File([blob], 'celebrateImage', { type: 'image/png' });
          const sendData = {
            celebrationId: this.data.celebrationId,
            recipientIds: this.data.userId,
            image: file
          };

          return this.employeeService.sendPostCard(sendData);
        }),
        catchError((error: Error) => {
          this.isButtonDisable$.next(false);
          this.isShowLoader$.next(false);

          return throwError(error);
        })
      )
      .subscribe(() => {
        this.modalWindow.closeAll();
        this.afterPostCardSend.emit(this.data.shortName);
      });
  }
}
