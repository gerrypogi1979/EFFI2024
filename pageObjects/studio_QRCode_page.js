const { expect } = require('@playwright/test');
import { BasePage } from './base_page';

exports.StudioQRCodePage = class StudioQRCodePage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.qRCodeAddWidgetSection = page.getByTestId("qrcode-element-dropdown");
        this.qRCodeWidgetIframe = page.frameLocator('#preview-iframe');
        this.destinationUrlTextBox = page.getByTestId("qrcode-destination-url");
        this.styleSettingButton = page.getByTestId("qrcode-style-setting");
        this.confirmChangeStyleButton = page.getByTestId("confirm-change-style");
        this.designSettingDropdown = page.getByTestId("qrcode-design-setting");
        this.qRColorButton = page.getByTestId("qrcode-color");
        this.hexColorTextBox = page.getByTestId("color-picker-hex");
        this.qRBgColorButton = page.getByTestId("qrcode-background-color");
        this.qRFrameColorButton = page.getByTestId("qrcode-frame-color");
        this.frameTextBox = page.getByTestId("qrcode-frame-text");
        this.frameTextColorButton = page.getByTestId("qrcode-frame-text-color");
        this.frameFontDropdown = page.getByTestId("qrcode-frame-font");
    };
  
    async addQRCode(qrCodeIcon, addButton) {
        await this.clickElementAndWait(this.qRCodeAddWidgetSection);

        await this.page.getByTestId(qrCodeIcon).hover();
        await expect(this.page.getByTestId(addButton)).toBeVisible();

        await this.page.getByTestId(addButton).click();
    };

    async verifyQRCodeWidgetIsAddedToScene(qrCodeIframeId) {
        await expect(this.qRCodeWidgetIframe.getByTestId(qrCodeIframeId)).toBeVisible({timeout:10000});
    };

    async enterDestinationUrl(qrCodeObject) {
        await this.destinationUrlTextBox.fill(qrCodeObject.destinationUrl);
        await expect(this.destinationUrlTextBox).toHaveValue(qrCodeObject.destinationUrl, {timeout:10000});
    };

    async doubleClickQRCodeIframe(qrCodeIframeId) {
        await this.doubleClickElement(this.qRCodeWidgetIframe.getByTestId(qrCodeIframeId), this.destinationUrlTextBox);
    };

    async clickDesignDropdown() {
        await this.clickElementAndWait(this.designSettingDropdown);

    };

    async editQRCodeDesign(designQRCodeObject) {
        await this.clickElementAndWait(this.qRColorButton);
        await this.fillElementAndWait( this.hexColorTextBox, designQRCodeObject.QRHexColor);
        //work around to close the color picker
        await this.clickElementAndWait(this.qRColorButton);
        await this.clickElementAndWait(this.qRBgColorButton);
        await this.hexColorTextBox.fill(designQRCodeObject.backgroundHexColor);
        await this.clickElementAndWait(this.qRBgColorButton);
    };

    async clickStyleSettingDropdown() {
        await this.clickElementAndWait(this.styleSettingButton);
    };

    async changeQRCodeStyle(qrCodeIcon) {
        await this.page.getByTestId(qrCodeIcon).click();
        await this.confirmChangeStyleButton.click();
    };
}; 