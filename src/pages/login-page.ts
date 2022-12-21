import { Page } from '@playwright/test';
import { sleep } from '../helpers/utils';

export class LoginPage {

    constructor(private readonly page: Page) {
    }

    private readonly url = '/customer/account/login/referer/';

    readonly signInButton: string = 'button.login';
    readonly usernameInput = 'input#email';
    readonly passwordInput = 'input#pass';
    readonly errorMessageForPage = 'div.message-error div';
    // readonly errorMessageForField = 'div.mage-error';

    /*readonly errorMessages : Map<string, string> = new Map<string, string>([
        ['page', this.errorMessageForPage],
        // ['field', this.errorMessageForField]
    ]); */

    selectGeoLocation(geoLocation: string) {
        return this.page.locator(`a.fxg-geo-locator__button[aria-label="${geoLocation}"]`);
    }

    selectTab(tabName: string) {
        return this.page.locator(`span.fxg-cube__text[aria-label="${tabName}"]`);
    }

    async openLoginPage() {
        await this.page.goto(this.url);
        await this.page.waitForSelector(this.signInButton);
    }

    async login(username: string, password: string) {
        await this.openLoginPage();
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.signInButton);
    }

    async getErrorMessage(forElement: 'page' | 'field') {
        return this.page.innerText(this.errorMessageForPage);
    }
}