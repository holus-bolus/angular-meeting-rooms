import { Component, EventEmitter, Output, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, take, map } from 'rxjs/operators';
import { DictionaryLike } from '../dictionary-like.interface';
import { OfficeService } from '@services/office.service';
import { IOffice } from 'src/app/interfaces/office';
import { ModalScrollService } from '@services/modalScroll.service';

const ESCAPE_BUTTON = 'document:keydown.escape';

@Component({
  selector: 'andteam-selector-wrapper',
  templateUrl: './office-selector-wrapper.component.html'
})
export class OfficeSelectorWrapperComponent implements OnInit {
  @Output() public selectionComplete = new EventEmitter<IOffice>();
  @Output() public sendCloseEvent = new EventEmitter<void>();

  public offices$: Observable<DictionaryLike[]>;
  public isConfirmationModal = true;

  constructor(
    private service: OfficeService,
    private scroll: ModalScrollService
  ) {}

  @HostListener(ESCAPE_BUTTON)
  public onKeydownHandler(): void {
    this.onOpenConfirmationModal();
    this.scroll.enable();
  }

  public ngOnInit(): void {
    this.offices$ = this.getSortedOfficesByAlphabetical$();
  }

  public handleChildSelection(officeId: string): void {
    if (officeId) {
      this.service.setCurrentOffice(officeId)
        .pipe(
          tap((office: IOffice) => this.selectionComplete.emit(office)),
          take(1)
        )
        .subscribe(() => this.sendCloseEvent.emit());
    } else {
      throw new Error('[OfficeSelectorWrapperComponent]:[handleChildSelection] - officeId is not valid');
    }
  }

  public onOpenConfirmationModal(): void {
    this.sendCloseEvent.emit();
  }

  private getSortedOfficesByAlphabetical$(): Observable<DictionaryLike[]> {
    return this.service.getAll().pipe(
      map((offices: DictionaryLike[]) =>
        offices.sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  }
}
