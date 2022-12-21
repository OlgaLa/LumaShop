import { Page } from '@playwright/test';

export class SearchResultPage {

    constructor(private readonly page: Page) {
    }
    
    readonly toolbarAmount = 'p.toolbar-amount';
    readonly shortSearchQueryMessage = 'div.message.notice div';

    async getProductsAmount() {
        return this.page.innerHTML(this.toolbarAmount);
    }

    async getShortSearchQueryMessage() {
        return this.page.innerHTML(this.shortSearchQueryMessage);
    }
}