import { Page } from '@playwright/test';
import { sleep } from '../helpers/utils';

export class HomePage {

    constructor(private readonly page: Page) {
    }

    readonly searchLabel: string = 'form#search_mini_form label';
    readonly cartLabel = 'div.minicart-wrapper';
    readonly searchField = 'input#search';

    async openHomePage() {
        await this.page.goto('/');
        await this.page.waitForSelector(this.searchLabel);
    }

    async searchItem(itemName: string) {
        await this.page.click(this.cartLabel);
        await this.page.fill(this.searchField, itemName);
        await this.page.keyboard.press('Enter');
    }
}