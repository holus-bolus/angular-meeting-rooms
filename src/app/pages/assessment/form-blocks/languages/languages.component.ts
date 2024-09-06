import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { ILanguageAssessment, ISalaryReview } from '@interfaces/candidate';
import { ILanguagePost, ILanguages, ILanguagesLevels, IPutLanguage } from '@interfaces/languages';
import { LanguageService } from '@services/assessments/language.service';
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { ICommonOption } from '@interfaces/filter';
import { concatMap, filter, map, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { CandidatesService } from '@services/assessments/candidates.service';
import { COORDINATOR_COMMENT_PLACEHOLDER } from '@constants/reviews';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';
import {
  MAX_LENGTH_LANGUAGE_COMMENT, MAX_LENGTH_LANGUAGE_MESSAGE,
  NUMBER_OF_LANGUAGES_FIELDS
} from '@pages/assessment/pages/progress-page/progress-page';

import trashCanSvg from '!!raw-loader!@andkit/components/selects/assessment-autocomplete/icons/trash-can.svg';
import eraserSvg from '!!raw-loader!@assets/images/eraser.svg';

@Component({
  selector: 'andteam-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagesComponent implements OnInit {
  @Input() set candidateLanguagesList(value: ILanguages[]) {
    this.allLanguagesList$.next(value);
  }

  @Input() set languagesLevelsList(value: ILanguagesLevels[]) {
    this.languagesLevelsList$.next(value);
  }

  @Input() set candidateId(value: string) {
    this.candidateId$.next(value);
  }

  public candidateLanguagesList$: Observable<ILanguageAssessment[]>;
  public isAssessmentLanguageList$: Observable<boolean>;
  public languagesList$: Observable<ILanguages[]>;
  public languagesLevelsList$ = new BehaviorSubject<ILanguagesLevels[]>(null);
  public isClearLanguageButton$: Observable<boolean>;
  public isFirstLanguage: Observable<boolean>;
  public selectType = COMPONENT_TYPES.LANGUAGE_LEVEL;
  public maxLengthLanguageComment = MAX_LENGTH_LANGUAGE_COMMENT;
  public languageCommentPlaceholder = COORDINATOR_COMMENT_PLACEHOLDER;
  public numberOfLanguagesFields = NUMBER_OF_LANGUAGES_FIELDS;
  public maxLengthErrorMessage = MAX_LENGTH_LANGUAGE_MESSAGE;
  public isFullLanguageList: boolean;
  public isMainClearButton: boolean;
  public isFirstClearButton: boolean;
  public dropdownHeight = 277;
  public languageChoose: ILanguagePost = {
    salaryReviewId: '',
    languageId: '',
    level: 'A1',
    comment: '',
  };

  readonly clearIcon = trashCanSvg;
  readonly eraserIcon = eraserSvg;

  private candidateId$ = new BehaviorSubject<string>(null);
  private languageChosen$ = new Subject<void>();
  private allLanguagesList$ = new BehaviorSubject(null);

  constructor(
    private languageService: LanguageService,
    private candidatesService: CandidatesService,
  ) { }

  public ngOnInit(): void {
    this.candidateLanguagesList$ = merge(this.candidateId$, this.languageChosen$
      .pipe(
        switchMapTo(this.candidateId$),
      ))
      .pipe(
        filter((value: string) => !!value),
        switchMap((value: string) => this.candidatesService.getCandidateDetails(value)),
        map((candidate: ISalaryReview) => candidate.languageAssessments),
        tap((list: ILanguageAssessment[]) => {
          this.isFullLanguageList = list.length < this.numberOfLanguagesFields;
          this.isMainClearButton = list.length < 2;
          this.isFirstClearButton = list.length < 1;
        })
    );

    this.languagesList$ = this.getLanguageList();
    this.isAssessmentLanguageList$ = this.isLanguagesList();
  }

  // deleting an already selected language from the general list of languages
  public getLanguageList(): Observable<ILanguages[]> {
    return this.candidateLanguagesList$
      .pipe(
        concatMap((candidateLanguagesList: ILanguageAssessment[]) => this.allLanguagesList$
          .pipe(
            map((languageList: ILanguages[]) => languageList.filter((language: ILanguages) => !candidateLanguagesList
              .some((candidateLanguage: ILanguageAssessment) => candidateLanguage.languageId === language.id))),
            take(1)
          )
        )
      );
  }

  public updateLanguage(event: ICommonOption, language: IPutLanguage): void {
    this.languageService.updateLanguage$(event, language).subscribe();
    this.languagesList$ = this.getLanguageList();
    this.languagesList$.subscribe();
    language.languageId = event.id;
  }

  public updateLanguageLevel(event: ICommonOption, language: IPutLanguage): void {
    this.languageService.updateLanguageLevel$(event, language).subscribe();
    language.level = event.name;
  }

  public updateLanguageComment(event: string, language: IPutLanguage): void {
    this.languageService.updateLanguageComment$(event, language).subscribe();
    language.comment = event;
  }

  public isLanguagesList(): Observable<boolean> {
    return this.candidateLanguagesList$
      .pipe(
        map((candidate: ILanguageAssessment[]) => !candidate.length),
      );
  }

  public addLanguage(): void {
    this.isAssessmentLanguageList$ = of(true);
  }

  public onSelectLanguage({ id }: ICommonOption): void {
    this.languageChoose.languageId = id;
    this.languageChoose.salaryReviewId = this.candidateId$.getValue();
    this.languageService.createLanguageAssessmentId$(this.languageChoose)
     .subscribe(() => this.languageChosen$.next());

    this.isAssessmentLanguageList$ = this.isLanguagesList();
  }

  public deleteLanguage(id: string): void {
    if (id) {
      this.languageService.deleteLanguage$(id).subscribe(() => this.languageChosen$.next());
    }

    this.isAssessmentLanguageList$ = this.isLanguagesList();
  }
}
