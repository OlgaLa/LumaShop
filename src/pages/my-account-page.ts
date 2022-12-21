import { Page } from '@playwright/test';
import { sleep } from '../helpers/utils';

export class MyAccountPage {

    constructor(private readonly page: Page) {
    }

    readonly accountInfo = 'div.box-information div.box-content';

    async getAccountInfo() {
        return this.page.innerText(this.accountInfo);
    }

}