import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { CommonElements } from '../pages/common-elements';
import { ProductsPage } from '../pages/products-page';
import { CheckoutPage } from '../pages/checkout-page';
import { CheckoutInfo } from '../models/checkout-info';
import { sleep } from '../helpers/utils';

test.describe('Checkout', async () => {

    let homePage: HomePage;
    let comEl: CommonElements;
    let productsPage: ProductsPage;
    let checkoutPage: CheckoutPage;

    let checkoutInfo: CheckoutInfo = {
      email: "test_email@e2e.com",
      firstName: "Dart",
      lastName: "Vader",
      street: "Prospect Mira",
      city: "Soligorsk",
      country: "Belarus",
      phone: "+31639393939",
      zipCode: "223710"
    }

    test.beforeEach(async ({page}) => {
      homePage = new HomePage(page);
      comEl = new CommonElements(page);
      productsPage = new ProductsPage(page);
      checkoutPage = new CheckoutPage(page);
    });

    test('User can process checkout', async () => {
      const quantity = 3;

      await homePage.openHomePage();
      let products = await productsPage.getAllProductsNames();
      await productsPage.clickOnProductLinkByName(products[0]);
      await productsPage.addProductToCard(quantity);
      await productsPage.waitForSuccessMessage();
      await comEl.ckickCartLink();
      await checkoutPage.clickProcessCheckout();
      await checkoutPage.finishChechoutInfo(checkoutInfo);
      let billingDetails = await checkoutPage.getBillingAddressDetails();

      expect(billingDetails).toContain(`${checkoutInfo.firstName} ${checkoutInfo.lastName}`);
      expect(billingDetails).toContain(checkoutInfo.street);
      expect(billingDetails).toContain(`${checkoutInfo.city}, ${checkoutInfo.zipCode}`);
      expect(billingDetails).toContain(checkoutInfo.country);
      expect(billingDetails).toContain(checkoutInfo.phone);

      await checkoutPage.clickPlaceOrderButton();
      expect(await checkoutPage.getEmailAddressInPlacedOrderPage()).toContain(checkoutInfo.email);

    }); 
});