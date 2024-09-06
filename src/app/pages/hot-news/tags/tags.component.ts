import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { INewsTag } from '@interfaces/news';
import { TagsService } from '@services/tags.service';

import closeSvg from '!!raw-loader!../../../core/andkit/components/inputs/portal-input/icons/close.svg';

@Component({
  selector: 'andteam-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsComponent),
      multi: true
    }
  ]
})
export class TagsComponent implements OnInit, ControlValueAccessor {
  public isOpenDropdown = false;
  public closeIcon: SafeHtml;
  public value: string;

  @Input() allTags: INewsTag[];
  @Input() titleTags: INewsTag[];

  constructor(
    private sanitizer: DomSanitizer,
    private tagService: TagsService
  ) { }

  public ngOnInit(): void {
    this.closeIcon = this.sanitizer.bypassSecurityTrustHtml(closeSvg as any);
  }

  public onCloseDropdown(isOpen: boolean): void {
    this.isOpenDropdown = isOpen;
  }

  public searchByTag(tag: INewsTag): void {
    if (!tag.checked) {
      const newValue = this.value ? `${tag.name},${this.value}` : tag.name;

      this.tagService.allTagsList.forEach((value: INewsTag) => {
        if (tag.name === value.name) {
          value.checked = true;
        }

        return value;
      });

      this.changeValue(newValue);
      this.isOpenDropdown = false;
    }
  }

  public onRemove(tagName: string): void {
    const newTags = this.value.split(',').filter(tag => tag !== tagName).join(',');

    this.changeValue(newTags);
    this.tagService.allTagsList.forEach((value: INewsTag) => {
      if (tagName === value.name) {
        value.checked = false;

        return value;
      }
    });
  }

  public registerOnChange(func: any): void {
    this.onChange = func;
  }

  public registerOnTouched(func: any): void {
    this.onTouched = func;
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  private onTouched = (value: string) => {};
  private onChange = (value: string) => {};

  private changeValue(value: string): void {
    this.value = value;
    this.onChange(value);
  }
}
