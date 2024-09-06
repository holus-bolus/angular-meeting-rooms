import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DictionaryLike } from '../dictionary-like.interface';

@Component({
  selector: 'andteam-default-office-landing',
  templateUrl: './default-office-landing.component.html',
  styleUrls: ['./default-office-landing.component.scss']
})

export class DefaultOfficeLandingComponent {
  public selectedOffice: DictionaryLike;

  constructor(private router: Router) { }

  public handleWrapperOutput(office: DictionaryLike): void {
    if (office) {
      // I left it for CanDeactivate guard to prevent extra DataBase queries
      this.selectedOffice = office;
      this.router.navigate(['/']);
    } else {
      throw new Error('[DefaultOfficeLandingComponent]:[handleWrapperOutput] - incoming [office] should be defined');
    }
  }
}
