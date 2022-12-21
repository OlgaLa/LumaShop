import { Page } from '@playwright/test';

export class CommonElements {

    constructor(private readonly page: Page) {
    }

    public REQUIRED_FIELD_ERROR_MESSAGE = 'This is a required field.';

    readonly pageTitle = 'span.base';
    readonly cardCounterNumber = 'span.counter-number';
    readonly cartLink = 'a.action.showcart';
    readonly cartLinkActive = 'a.action.showcart.active';

    readonly errorMessageForPage = 'div.message-error div';
    readonly errorMessageForField = 'div.mage-error';
    readonly errorMessages : Map<string, string> = new Map<string, string>([
        ['page', this.errorMessageForPage],
        ['field', this.errorMessageForField]
    ]);

    async getErrorsAmount() {
        return (await this.page.$$(this.errorMessageForField)).length;
    }

    async getErrorMessage(forElement: 'page' | 'field', number: number = 0) {
        let messages = await this.page.locator(this.errorMessages.get(forElement) as string);
        return messages.nth(number).textContent();
    }

    async getPageTitle() {
        return this.page.innerText(this.pageTitle);
    }

    async getCartCounter() {
        return this.page.innerText(this.cardCounterNumber);
    }

    async ckickCartLink() {
        await this.page.click(this.cartLink);
    }

}