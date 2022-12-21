import { Page } from '@playwright/test';

export class CommonElements {

    constructor(private readonly page: Page) {
    }

    readonly pageTitle = 'span.base';
    readonly cardCounterNumber = 'span.counter-number';
    readonly cartLink = 'a.action.showcart';
    readonly cartLinkActive = 'a.action.showcart.active';

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