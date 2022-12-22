import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { CommonElements } from '../pages/common-elements';
import { SearchResultPage } from '../pages/search-results-page';
import { sleep } from '../helpers/utils';
import { ProductsPage } from '../pages/products-page';

test.describe('Search', async () => {

  let homePage: HomePage;
  let comEl: CommonElements;
  let searchResultPage: SearchResultPage;
  let productsPage: ProductsPage;

  const SEARCH_ERROR_MESSAGE = 'Minimum Search query length is 3';

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    comEl = new CommonElements(page);
    searchResultPage = new SearchResultPage(page);
    productsPage = new ProductsPage(page);
  });

  const tests = [{
    searchItem: 'Sinbad Fitness Tank', 
    productsAmount: '34'
  }, 
  {
    searchItem: "Gray full zip hoodie", 
    productsAmount: '86'
  }, 
  {
    searchItem: "purple", 
    productsAmount: '44'
  }];

  tests.forEach(option => {
    test(`by: ${option.searchItem}`, async () => {
      await homePage.openHomePage();
      await homePage.searchItem(option.searchItem);
      expect(await comEl.getPageTitle()).toBe(`Search results for: '${option.searchItem}'`);
      expect(await searchResultPage.getProductsAmount()).toContain(option.productsAmount);
      expect(await productsPage.waitForProducts(12)).toBe(12);
    });
  });

  test('with a query which has the length less then 3 symbols', async () => {
    await homePage.openHomePage();
    await homePage.searchItem("pu");
    expect(await comEl.getPageTitle()).toBe(`Search results for: 'pu'`);
    expect(await searchResultPage.getShortSearchQueryMessage()).toContain(SEARCH_ERROR_MESSAGE);
    expect(await productsPage.waitForProducts(0)).toBe(0);
  }); 

});
