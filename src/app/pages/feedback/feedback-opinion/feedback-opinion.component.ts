import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFeedbackOpinionPostData } from '@interfaces/feedback.interface';
import { ReplaySubject } from 'rxjs';

import validationSvg from '!!raw-loader!@assets/images/validation.svg';

@Component({
  selector: 'andteam-feedback-opinion',
  templateUrl: './feedback-opinion.component.html',
  styleUrls: ['./feedback-opinion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackOpinionComponent implements OnInit, OnChanges {
  @Input() opinionStrengthsControl: FormControl;
  @Input() opinionImproveControl: FormControl;
  @Input() strengthsMinLength: number;
  @Input() improveMinLength: number;
  @Input() maxLength: number;
  @Input() positionType: string;

  public strengthPlaceholder: string;
  public opinonPlaceholder: string;
  public description: string;
  public isButtonDisabled: boolean;
  public strengthsErrorText: ReplaySubject<string> = new ReplaySubject<string>(1);
  public improveErrorText: ReplaySubject<string> = new ReplaySubject<string>(1);
  public noFirstWhitespaces = /\S/;
  public isFieldValueValid = true;
  public postData: IFeedbackOpinionPostData;

  public readonly validationIcon = validationSvg as string;

  readonly errorRequiredField = 'Required field';
  readonly errorRequiredImprove = 'Please write few words about what to improve';
  readonly errorLatinOnly = 'Latin characters only';

  ngOnChanges(): void {
    switch (this.positionType) {
      case 'ResourсeManagement': {
        this.strengthPlaceholder = `RM's strengths`;
        this.opinonPlaceholder = `What needs to be improved`;
        this.description = `Write RM\’s strengths (min 100 symbols) and weaknesses (min 1 symbol). Please use English only.`;
      }  
      break;
      case 'HumanResources': {
        this.strengthPlaceholder = `HR's strengths`;
        this.opinonPlaceholder = `What needs to be improved`;
        this.description = `Write HR\’s strengths (min 100 symbols) and weaknesses (min 1 symbol). Please use English only.`;
      }  
      break;
      case 'RMsCoordinates': {
        this.strengthPlaceholder = `Coordinates's strengths`;
        this.opinonPlaceholder = `What needs to be improved`;
        this.description = `Write RM\’s strengths (min 100 symbols) and weaknesses (min 1 symbol). Please use English only.`;
      }  
      break;
      case 'Project': {
        this.strengthPlaceholder = `What's good at the project`;
        this.opinonPlaceholder = `What needs to be improved`;
        this.description = `Please write what is good at the project (min 100 symbols) and what needs to be improved (min 1 symbol). 
        Please use English only.`;
      }  
      break;
      default:{
        this.strengthPlaceholder = `Person's strengths`;
        this.opinonPlaceholder = `What needs to be improved`;
        this.description = `Please write the strengths and what needs to be improved.
        Your opinion of the person\'s strengths (min 100 characters). Please use English language only.`;
      }  
      break;
    }
  }

  public ngOnInit() : void {
    this.onKeyUpControl(this.opinionStrengthsControl, this.strengthsErrorText);
    this.onKeyUpControl(this.opinionImproveControl, this.improveErrorText);
  }

  public getErrorMessage(length: string, minLength: number): string {
    return `Number of characters: ${length}/${this.maxLength} (min ${minLength})`;
  }

  public get isStrengthsFormValid(): boolean {
    return this.opinionStrengthsControl.valid || this.isFieldValueValid;
  }

  public get isImproveFormValid(): boolean {
    return this.opinionImproveControl.valid || this.isFieldValueValid;
  }

  public onKeyUpControl(control: FormControl, errorText: ReplaySubject<string>): void {
    let minLength: number;
    switch (control) {
      case this.opinionImproveControl:
        minLength = this.improveMinLength;
        break;
      case this.opinionStrengthsControl:
        minLength = this.strengthsMinLength;
        break;
      default:
        throw(new Error('Wrong name of FormControl'));
    }

    errorText.next(this.getErrorMessage(control.value.length, minLength));
  }

  public onClickStrengthsField(): void {
    if (this.opinionStrengthsControl.value.length === 0) {
      this.isFieldValueValid = true;
    }
  }

  public onClickImproveField(): void {
    if (this.opinionImproveControl.value.length === 0) {
      this.isFieldValueValid = true;
    }
  }
}
