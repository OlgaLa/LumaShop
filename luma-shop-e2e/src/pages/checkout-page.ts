import { Page } from '@playwright/test';
import { sleep } from '../helpers/utils';
import { CheckoutInfo } from '../models/checkout-info';

export class CheckoutPage {

    constructor(private readonly page: Page) {
    }

    readonly processCheckoutButton = 'button#top-cart-btn-checkout';
    readonly subtotalPrice = 'div.subtotal span.price';
    readonly emailAddressInput = 'fieldset#customer-email-fieldset input#customer-email';
    readonly firstNameInput = 'input[name="firstname"]';
    readonly lastNameInput = 'input[name="lastname"]';
    readonly streetAddressInput = 'input[name="street[0]"]';
    readonly cityInput = 'input[name="city"]';
    readonly stateInput = 'select[name="region_id"]';
    readonly zipCodeInput = 'input[name="postcode"]';
    readonly countryInput = 'select[name="country_id"]';
    readonly phoneNumberInput = 'input[name="telephone"]';
    readonly shippingMethod = 'input[name="ko_unique_1"]';
    readonly shippingMethods = 'div#checkout-shipping-method-load input';
    readonly nextButton = 'button.continue';
    readonly placeOrderButton = 'button.action.checkout';
    readonly billingAddressDetails = 'div.billing-address-details';
    readonly continieShoppingButton = 'a.action.continue';
    readonly emailInfo = 'div#registration div p span';
    readonly paymentMethodTitle = 'div.payment-group div.step-title';

    async clickProcessCheckout() {
        await this.page.waitForSelector(this.subtotalPrice);
        await this.page.click(this.processCheckoutButton);
    }

    async fillChechoutInfo(checkoutInfo: CheckoutInfo) {
        await this.page.click(this.emailAddressInput);
        await this.page.fill(this.emailAddressInput, checkoutInfo.email);
        await this.page.click(this.firstNameInput);
        await this.page.fill(this.firstNameInput, checkoutInfo.firstName);
        await this.page.click(this.lastNameInput);
        await this.page.fill(this.lastNameInput, checkoutInfo.lastName);
        await this.page.click(this.emailAddressInput);
        await this.page.fill(this.streetAddressInput, checkoutInfo.street);
        await this.page.click(this.cityInput);
        await this.page.fill(this.cityInput, checkoutInfo.city);
        
        await this.page.click(this.zipCodeInput);
        await this.page.fill(this.zipCodeInput, checkoutInfo.zipCode);
        
        await this.page.click(this.countryInput);
        await this.page.locator(`${this.countryInput}`).selectOption(checkoutInfo.country);

        if(checkoutInfo.state!=undefined) {
            await this.page.click(this.stateInput);
            await this.page.locator(`${this.stateInput}`).selectOption(checkoutInfo.state);
        }

        await this.page.click(this.phoneNumberInput);
        await this.page.fill(this.phoneNumberInput, checkoutInfo.phone);
        
    }

    async finishChechoutInfo(checkoutInfo: CheckoutInfo) {
        await this.fillChechoutInfo(checkoutInfo);
        await sleep(3000); // TO DO: find a way to wait when the shipping methods are updated
        await this.page.click(this.nextButton);
        await this.page.waitForSelector(this.billingAddressDetails);
    }

    async getBillingAddressDetails() {
        return this.page.innerText(this.billingAddressDetails);
    }

    async clickPlaceOrderButton() {
        await this.page.click(this.placeOrderButton);
        await this.page.waitForSelector(this.continieShoppingButton);
    }

    async getEmailAddressInPlacedOrderPage() {
        let email = await this.page.locator(this.emailInfo);
        return email.nth(1).textContent();
    }

    async getPaymentMethodTitle() {
        return this.page.innerText(this.paymentMethodTitle);
    }
}