import { PunctuationTitleDirective } from './punctuation-title.directive';

describe('PunctuationTitleDirective', () => {
  let directive: PunctuationTitleDirective;

  beforeEach(() => {
    directive = new PunctuationTitleDirective(null, null);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('PunctuationTitleDirective.createContext', () => {
    it('createContext method must pass the test', () => {
      expect(directive.createContext('title......????????!!!!!!')).toEqual({symbols: '......????????!!!!!!', title: 'title' });
      expect(directive.createContext('title ? . ? !')).toEqual({symbols: ' ? . ? !', title: 'title' });
      expect(directive.createContext('title!.? ? .!! title? . ? !')).toEqual({symbols: '? . ? !', title: 'title!.? ? .!! title' });
      expect(directive.createContext('?....... ? !')).toEqual({symbols: '?....... ? !', title: '' });
      expect(directive.createContext('title////')).toEqual({symbols: '', title: 'title////' });
    });
  });
});
