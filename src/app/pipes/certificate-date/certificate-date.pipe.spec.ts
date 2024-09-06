import { CertificateDatePipe } from './certificate-date.pipe';

describe('CertificateDatePipe', () => {
  it('create an instance', () => {
    const pipe = new CertificateDatePipe();
    expect(pipe).toBeTruthy();
  });
});
