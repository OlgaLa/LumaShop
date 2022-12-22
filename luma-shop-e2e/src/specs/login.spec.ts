import { expect, test } from '@playwright/test';
import { sleep } from '../helpers/utils';
import { CommonElements } from '../pages/common-elements';
import { LoginPage } from '../pages/login-page';
import { MyAccountPage } from '../pages/my-account-page';

test.describe('Login', async () => {

  let loginPage: LoginPage;
  let myAccountPage: MyAccountPage;
  let comEl: CommonElements;

  const USERNAME = 'test8998@test.com';
  const PASSWORD = 'qazxswedc123!';
  const LOGIN_PAGE_TITLE = 'Customer Login';

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    comEl = new CommonElements(page);
  });

  test('with existing user', async ( { page } ) => {
    await loginPage.login(USERNAME, PASSWORD);
    await page.waitForSelector(myAccountPage.accountInfo);

    expect(await comEl.getPageTitle()).toBe("My Account");
    expect(await myAccountPage.getAccountInfo()).toContain(USERNAME);
  }); 

  test('with empty username', async () => {
    await loginPage.login('     ', PASSWORD);
    expect(await comEl.getErrorMessage('field')).toBe(comEl.REQUIRED_FIELD_ERROR_MESSAGE);
    expect(await comEl.getPageTitle()).toBe(LOGIN_PAGE_TITLE);
  }); 

});