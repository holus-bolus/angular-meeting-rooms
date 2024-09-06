import { AutoCompleteModule } from './autocomplete.module';

describe('AutoCompleteModule', () => {
  let autoCompleteModule: AutoCompleteModule;

  beforeEach(() => {
    autoCompleteModule = new AutoCompleteModule();
  });

  it('should create an instance', () => {
    expect(autoCompleteModule).toBeTruthy();
  });
});
