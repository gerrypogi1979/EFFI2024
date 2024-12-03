const { expect } = require('@playwright/test');
import { BasePage } from './base_page';

exports.StudioTextWidgetPage = class StudioTextWidgetPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.textWidgetSection = page.getByTestId("text-element-dropdown");
        this.textWidgetIframe = page.frameLocator('#preview-iframe');
        this.enterTextBox = page.getByTestId("enter-text");
        this.fontFamilyDropdown = page.getByTestId("text-font-family");
        this.fontStyleDropdown = page.getByTestId("text-font-style");
        this.fontSizeInput = page.getByTestId("text-font-size");
        this.fontColorButton = page.getByTestId("text-font-color");
        this.hexColorTextBox = page.getByTestId("color-picker-hex");        
        this.backgroundColorButton = page.getByTestId("text-background-color");
        this.borderColorButton = page.getByTestId("text-border-color");
    };

    async addTextWidget(textIcon, addButton) {
        await this.clickElementAndWait(this.textWidgetSection);

        await this.page.getByTestId(textIcon).hover();
        await expect(this.page.getByTestId(addButton)).toBeVisible();

        await this.page.getByTestId(addButton).click();
    };

    async verifyTextWidgetIsAddedToScene(textIframe) {
        await expect(this.textWidgetIframe.getByTestId(textIframe)).toBeVisible({timeout:10000});
    };

    async fillTextBox(buildTextObject) {
        await this.enterTextBox.fill(buildTextObject.textContent);
    };

    async verifyTextContentUpdated(textIframe, buildTextObject) {
        await expect(this.textWidgetIframe.frameLocator("//div[@data-testid='" + textIframe + "']/iframe").locator("//div[@id='text_container']")).toContainText(buildTextObject.textContent);
    };

    async doubleClickTextWidgetIframe(textIframe) {
        await this.doubleClickElement(this.textWidgetIframe.getByTestId(textIframe), this.enterTextBox);
    };

    async editTextWidgetDesign(designTextObject) {
        await this.fontFamilyDropdown.selectOption(designTextObject.font);
        await this.page.waitForTimeout(1000);

        await this.fontStyleDropdown.selectOption(designTextObject.fontStyle);
        await this.page.waitForTimeout(1000);

        await this.fillElementAndWait(this.fontSizeInput, designTextObject.fontSize);

        await this. clickElementAndWait(this.fontColorButton);
        await this.hexColorTextBox.fill(designTextObject.fontHexColor);
        await this.clickElementAndWait(this.fontColorButton);

        await this.clickElementAndWait(this.backgroundColorButton); 
        await this.fillElementAndWait(this.hexColorTextBox, designTextObject.backgroundHexColor);
        await this.clickElementAndWait(this.backgroundColorButton);
    };
};
 