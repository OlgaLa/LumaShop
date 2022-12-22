import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { CommonElements } from '../pages/common-elements';
import { ProductsPage } from '../pages/products-page';

test.describe('Product', async () => {

    let homePage: HomePage;
    let comEl: CommonElements;
    let productsPage: ProductsPage;

    test.beforeEach(async ({page}) => {
      homePage = new HomePage(page);
      comEl = new CommonElements(page);
      productsPage = new ProductsPage(page);
    });

    test(': add a product to the cart', async () => {
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

    test(': not add a product to the cart without selecting size and color', async () => {
      
      await homePage.openHomePage();
      let products = await productsPage.getAllProductsNames();
      expect(products.length).not.toBe(0);
      
      await productsPage.clickOnProductLinkByName(products[0]);
      expect(await comEl.getPageTitle()).toBe(products[0]);
      
      await productsPage.clickAddToCartButton();
      expect(await comEl.getPageTitle()).toBe(products[0]);
      expect(await comEl.getErrorsAmount()).toBe(2);
      expect(await comEl.getErrorMessage('field')).toBe(comEl.REQUIRED_FIELD_ERROR_MESSAGE);
      expect(await comEl.getErrorMessage('field', 1)).toBe(comEl.REQUIRED_FIELD_ERROR_MESSAGE);
      
    }); 
});