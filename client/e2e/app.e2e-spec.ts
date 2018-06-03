import { HeiHealthPage } from './app.po';

describe('hei-health App', () => {
  let page: HeiHealthPage;

  beforeEach(() => {
    page = new HeiHealthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
