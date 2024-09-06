import {BackwardLinkModule} from '@andkit/components/buttons/backward-link/backward-link.module';

describe('BackwardLinkModule', () => {
  let backwardLinkModule: BackwardLinkModule;

  beforeEach(() => {
    backwardLinkModule = new BackwardLinkModule();
  });

  it('should create an instance', () => {
    expect(backwardLinkModule).toBeTruthy();
  });
});
