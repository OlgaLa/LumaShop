import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { CommonElements } from '../pages/common-elements';
import { ProductsPage } from '../pages/products-page';

test.describe('Product page', async () => {

    let homePage: HomePage;
    let comEl: CommonElements;
    let productsPage: ProductsPage;

    const REQUIRED_FIELD_ERROR_MESSAGE = 'This is a required field.';

    test.beforeEach(async ({page}) => {
      homePage = new HomePage(page);
      comEl = new CommonElements(page);
      productsPage = new ProductsPage(page);
    });

    test('User can add a product to the cart', async () => {
      const quantity = 2;
      await homePage.openHomePage();
      let products = await productsPage.getAllProductsNames();
      
      expect(products.length).not.toBe(0);
      
      await productsPage.clickOnProductLinkByName(products[0]);
      expect(await comEl.getPageTitle()).toBe(products[0]);
      
      await productsPage.addProductToCard(quantity);
      expect(await productsPage.getSuccessMessage()).toContain(`You added ${products[0]} to your`);
      expect(await comEl.getCartCounter()).toBe(quantity.toString());
    }); 

    test('User can not add a product to the cart without selecting size and color', async () => {
      
      await homePage.openHomePage();
      let products = await productsPage.getAllProductsNames();
      expect(products.length).not.toBe(0);
      
      await productsPage.clickOnProductLinkByName(products[0]);
      expect(await comEl.getPageTitle()).toBe(products[0]);
      
      await productsPage.clickAddToCartButton();
      expect(await comEl.getPageTitle()).toBe(products[0]);
      expect(await productsPage.getErrorsAmount()).toBe(2);
      expect(await productsPage.getErrorMessage()).toBe(REQUIRED_FIELD_ERROR_MESSAGE);
      expect(await productsPage.getErrorMessage(1)).toBe(REQUIRED_FIELD_ERROR_MESSAGE);
      
    }); 
});