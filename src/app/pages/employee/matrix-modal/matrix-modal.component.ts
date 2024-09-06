import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { MATRIX_LINK } from '../employee';
import { ERROR_CODES } from '@constants/errors';
import { MatrixService } from '@services/assessments/matrix.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/internal/operators';
import { Subject } from 'rxjs';
import {
  ALREADY_FILLED_ERROR_MESSAGE,
  ANOTHERS_MATRIX_ERROR_MESSAGE,
  ERROR_BUTTON,
  SUCCESS_BUTTON
} from './matrix-modal';

@Component({
  selector: 'andteam-matrix-modal',
  templateUrl: './matrix-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatrixModalComponent implements OnInit {
  public isSuccessModal: boolean;
  public buttonName: string;
  public matrixLink: string;
  public matrixErrors: string;
  public isOpenCancelModal = false;
  public isLoading = false;
  public mainMessage: string;
  public additionalMessage: string;
  public isModalContainsLink: boolean;
  public destroy$ = new Subject<void>();

  @Input() public isInterviewModal: boolean;
  @Input() public successMessage: string;
  @Input() public errorMessage: string;
  @Input() public additionalSuccessMessage: string;
  @Input() public interviewerTips: string[];

  @Output() public closeModal = new EventEmitter<boolean>();

  constructor(
    private matrixService: MatrixService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    const { matrix } = this.route.snapshot.queryParams;

    this.checkMatrix(matrix);
    this.matrixLink = `${MATRIX_LINK}${matrix}`;
  }

  public onCancel(): void {
    this.closeModal.emit();
  }

  private checkMatrix(matrix: string): void {
    this.isLoading = true;
    this.matrixService.checkMatrix(matrix)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isOpenCancelModal = true;
          this.changeDetectorRef.markForCheck();
        }),
      )
      .subscribe(
        () => {
          this.isSuccessModal = true;
          this.isModalContainsLink = false;
          this.mainMessage = this.successMessage;
          this.additionalMessage = this.additionalSuccessMessage;
          this.buttonName = SUCCESS_BUTTON;
          this.changeDetectorRef.markForCheck();
        },
        ({ code, errors }) => {
          if (code === ERROR_CODES.VALIDATION_FAILED) {
            this.isSuccessModal = false;
            this.isModalContainsLink = true;
            this.mainMessage = this.errorMessage;
            this.matrixErrors = errors.map(error => error.field).join(', ');
            this.buttonName = ERROR_BUTTON;
          }
          if (code === ERROR_CODES.BAD_REQUEST) {
            this.isSuccessModal = false;
            this.isModalContainsLink = false;
            this.mainMessage = ALREADY_FILLED_ERROR_MESSAGE;
            this.buttonName = SUCCESS_BUTTON;
          }
          if (code === ERROR_CODES.ACCESS_DENIED) {
            this.isSuccessModal = false;
            this.isModalContainsLink = false;
            this.mainMessage = ANOTHERS_MATRIX_ERROR_MESSAGE;
            this.buttonName = SUCCESS_BUTTON;
          }

          this.changeDetectorRef.markForCheck();
        }
      );
  }
}
