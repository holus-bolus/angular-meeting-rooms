import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BlurEvent, CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { FormControl } from '@angular/forms';
import { PORTAL_API } from '../../../../appConfigs/config';
import { ImagesService } from '@services/images.service';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';

import * as customEditor from '@assets/CKEditor5/build/ckeditor';

interface IImageUrl {
  default: string;
}

@Component({
  selector: 'andteam-block-creation',
  templateUrl: './block-creation.component.html',
  styleUrls: ['./block-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockCreationComponent {
  @Input() public title: FormControl;
  @Input() public text: string;
  @Input() public hasTitleError: boolean;
  @Input() public titleError: string;
  @Input() public hasTextError: boolean;
  @Input() public textError: string;
  @Input() public disabled: boolean;

  @Output() public changeData = new EventEmitter<string>();
  @Output() public saveData = new EventEmitter<void>();
  @Output() public cancelCreation = new EventEmitter<void>();

  classicEditor: CKEditor5.EditorConstructor = customEditor;
  config = {
    image: {
      resizeUnit: 'px',
      toolbar: [
        'imageStyle:full',
        'imageStyle:alignLeft',
        'imageStyle:alignRight'],
      styles: ['full', 'alignLeft', 'alignRight'],
    },
    link: {
      addTargetToExternalLinks: true,
    },
    mediaEmbed: {
      previewsInData: true
    },
  };
  buttonType = BUTTON_TYPES.SECONDARY;
  maxLength = 70;

  constructor(private imagesService: ImagesService) {}

  public onReady(eventData: any): void {
    eventData.plugins.get('FileRepository').createUploadAdapter = (editor: CKEditor5.Editor) => {
      return new UploadAdapter(editor, this.imagesService);
    };
  }

  public onBlur({ editor }: BlurEvent): void {
    const data = editor.getData().slice(3, -4);

    this.changeData.emit(data);
  }

  public onClick(): void {
    this.saveData.emit();
  }

  public onCancel(): void {
    this.cancelCreation.emit();
  }
}

class UploadAdapter {
  editor: CKEditor5.Editor;
  imagesService: ImagesService;

  constructor(editor: CKEditor5.Editor, imagesService: ImagesService) {
    this.editor = editor;
    this.imagesService = imagesService;
  }

  upload(): Promise<IImageUrl> {
    return new Promise((resolve) => {
      return this.editor.file
        .then((file) => {
          const formData = new FormData();
          formData.append('file', file);

          return this.imagesService.post<string>(formData)
            .subscribe((url) => {
              resolve({ default: `${PORTAL_API}/images/${url}` });
            });
        });
    });
  }
}
