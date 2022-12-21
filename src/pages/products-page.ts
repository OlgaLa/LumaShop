import { Page } from '@playwright/test';
import { sleep } from '../helpers/utils';

export class ProductsPage {

    constructor(private readonly page: Page) {
    }

    readonly productInfo = 'div.product-item-info';
    readonly productLink = 'a.product-item-link';
    readonly addToCartButton = 'button.tocart';
    readonly productAddForm = 'div.product-add-form';
    readonly productSize = 'div.swatch-option.text';
    readonly productColor = 'div.swatch-option.color';
    readonly quantityField = 'input.input-text.qty';
    readonly successMessage = 'div.message-success.success div';

    getProductByName(productName: string) {
        return `${this.productLink}[title="${productName}"]`;
    }

    getProductSizeByName(sizeName: string) {
        return `${this.productSize}[option-label="${sizeName}"]`;
    }

    async getNumberOfProductsOnPage() {
        return (await this.page.$$(this.productInfo)).length;
    }

    async waitForProducts(expected: number, numberOfTry: number = 3) {
        let amount = await this.getNumberOfProductsOnPage();
        let count = 0;
        while(amount != expected || count<numberOfTry){
            await sleep(500);
            amount = await this.getNumberOfProductsOnPage();
            count++;
        }
        return amount;
    }

    async getAllProductsNames(): Promise<string[]> {
        return this.page.locator(this.productLink).allInnerTexts();
    }

    async getSuccessMessage() {
        return this.page.innerText(this.successMessage);
    }

    async waitForSuccessMessage() {
        return this.page.waitForSelector(this.successMessage);
    }

    async clickOnProductLinkByName(productName: string) {
        await this.page.click(this.getProductByName(productName));
        await this.page.waitForSelector(this.productSize);
    }

    async clickAddToCartButton() {
        await this.page.click(this.addToCartButton);
    }

    async addProductToCard(quantity: number = 0) {
        let sizesAmount = (await this.page.$$(this.productSize)).length;

        if(sizesAmount != 0) {
            let sizes = await this.page.locator(this.productSize);
            let selectedSizeNumber = Math.floor(Math.random()*sizesAmount);
            let selectedSize = await sizes.nth(selectedSizeNumber).textContent() as string;
            await this.page.click(this.getProductSizeByName(selectedSize));
        } 
        let colors = await this.page.$$(this.productColor);

        if(colors.length!=0) {
            await colors[0].click();
        }

        if(quantity>1) {
            await this.page.click(this.quantityField);
            await this.page.locator(this.quantityField).clear;
            await sleep(500);
            await this.page.fill(this.quantityField, quantity.toString());
        }
        await this.clickAddToCartButton();
    }
}