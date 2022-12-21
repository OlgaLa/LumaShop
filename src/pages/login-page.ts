import { Page } from '@playwright/test';
import { sleep } from '../helpers/utils';

export class LoginPage {

    constructor(private readonly page: Page) {
    }

    private readonly url = '/customer/account/login/referer/';

    readonly signInButton: string = 'button.login';
    readonly usernameInput = 'input#email';
    readonly passwordInput = 'input#pass';
    
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
}