import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface IPunctuationContext {
  symbols: string;
  title: string;
}

@Directive({
  selector: '[andteamPunctuationTitle]'
})
export class PunctuationTitleDirective {
  @Input() set andteamPunctuationTitle(title: string) {
    this.createTemplate(title);
  }

  private context: IPunctuationContext;

  constructor(
    private templateRef: TemplateRef<IPunctuationContext>,
    private viewContainerRef: ViewContainerRef
  ) { }

  public createTemplate(title: string): void {
    this.context = this.createContext(title);
    this.context.symbols = !this.context.symbols ? '.' : this.context.symbols;
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }

  public createContext(value: string): IPunctuationContext {
    const regex = new RegExp('(^.*?)([?!.\\s]*$)');
    const parsed = value.match(regex);

    if (!parsed) {
      return {
        title: value,
        symbols: '.'
      };
    }

    parsed.groups = {
      header: parsed[1],
      punctuation: parsed[2]
    };

    return {
      title: parsed.groups.header,
      symbols: parsed.groups.punctuation
    };
  }
}
