import { PokeAppPage } from './app.po';

describe('poke-app App', function() {
  let page: PokeAppPage;

  beforeEach(() => {
    page = new PokeAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
