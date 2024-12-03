const { expect } = require('@playwright/test');
import { BasePage } from './base_page';

exports.StudioBannersPage = class StudioBannersPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.bannersAddWidgetSection = page.getByTestId("banners-element-dropdown");
        this.bannerWidgetIframe = page.frameLocator('#preview-iframe');
        this.buidSettingButton = page.getByTestId("banner-build-setting");
        this.tickerTextBox = page.getByTestId("ticker-textbox");
        this.designSettingButton = page.getByTestId("banner-design-setting");
        this.breakSymbolButton = page.getByTestId("break-symbol-button");
        this.breakSymbolColorButton = page.getByTestId("break-symbol-color");
        this.fontColorButton = page.getByTestId("banner-font-color");
        this.fontFamilyDropdown = page.getByTestId("banner-font-family");
        this.fontStyleDropdown = page.getByTestId("banner-font-style");
        this.fontSizeTextBox = page.getByTestId("banner-font-size");
        this.backgroundColorButton = page.getByTestId("banner-background-color");
        this.borderColorButton = page.getByTestId("banner-border-color");
        this.hexColorTextBox = page.getByTestId("color-picker-hex");
    };

    async addBanner(tickerIcon, addButton) {
        await this.clickElementAndWait(this.bannersAddWidgetSection);
        
        await this.page.getByTestId(tickerIcon).hover();
        await expect(this.page.getByTestId(addButton)).toBeVisible();
        
        await this.page.getByTestId(addButton).click();
    };

    async verifyBannerAddedToScene(bannerIframeId) {
        await expect(this.bannerWidgetIframe.getByTestId(bannerIframeId)).toBeVisible({timeout:10000});
    };

    async editBannerBuild(buildBannerObject) {
        await this.buidSettingButton.click();
        await this.fillElementAndWait(this.tickerTextBox, buildBannerObject.tickerText);
    };

    async verifyBannerTextUpdated(bannerIframeId, buildBannerObject) {
        await expect(this.bannerWidgetIframe.frameLocator("//div[@data-testid='"+ bannerIframeId + "']/iframe").locator("//div[contains(text(),'" + buildBannerObject.tickerText + "')]")).toBeVisible();
    };
    
    async doubleClickBannerIframe(bannerIframeId) {
        await this.doubleClickElement(this.bannerWidgetIframe.getByTestId(bannerIframeId), this.buidSettingButton);
    };

    async editBannerDesign(designBannerObject) {
        await this.designSettingButton.click();

        await this.breakSymbolButton.click();
        await this.page.locator("//button[@value='" + designBannerObject.breakSymbolShapeValue + "']").click();
        await this.page.waitForTimeout(1000);

        await this.clickElementAndWait(this.breakSymbolColorButton);
        await this.hexColorTextBox.fill(designBannerObject.breakSymbolHexColor);
        await this.clickElementAndWait(this.breakSymbolColorButton);

        await this.clickElementAndWait(this.fontColorButton);
        await this.hexColorTextBox.fill(designBannerObject.fontHexColor);
        await this.clickElementAndWait(this.fontColorButton);
        
        await this.fontFamilyDropdown.selectOption(designBannerObject.fontFamily);
        await this.page.waitForTimeout(1000);

        await this.fontStyleDropdown.selectOption(designBannerObject.fontStyle);
        await this.page.waitForTimeout(1000);

        await this.fontSizeTextBox.selectOption(designBannerObject.fontSize);
        await this.page.waitForTimeout(1000);

        await this.clickElementAndWait(this.backgroundColorButton);
        await this.hexColorTextBox.fill(designBannerObject.backgroundHexColor);
        await this.clickElementAndWait(this.backgroundColorButton);
    };
};

