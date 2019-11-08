import { GetFileBasenamePipe } from './get-file-basename.pipe';

describe('GetFileBasenamePipe', () => {
  it('create an instance', () => {
    const pipe = new GetFileBasenamePipe();
    expect(pipe).toBeTruthy();
  });
});
