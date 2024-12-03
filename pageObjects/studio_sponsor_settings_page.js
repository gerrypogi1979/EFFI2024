const { expect } = require('@playwright/test');
import { BasePage } from './base_page';

exports.StudioSponsorSettingsPage = class StudioSponsorSettingsPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.sponsorSettingsButton = page.getByTestId("sponsor-settings"); 
        this.sponsorToggle = page.getByTestId("sponsor-toggle");
        this.uploadSponsorLogoInput = page.getByTestId("sponsor-logo-upload-input");
        this.sponsorTextBox = page.getByTestId("sponsor-textbox");
        this.positionTopButton = page.getByTestId("sponsor-top-position");
        this.positionBottomButton = page.getByTestId("sponsor-bottom-position");
        this.fontFamilyDropdown = page.getByTestId("sponsor-font-family");
        this.fontStyleDropdown = page.getByTestId("sponsor-font-style");
        this.fontSizeButton = page.getByTestId("sponsor-font-size");
        this.fontColorButton = page.getByTestId("sponsor-font-color");
        this.backgroundColorButton = page.getByTestId("sponsor-background-color");
        this.hexColorTextbox = page.getByTestId("color-picker-hex");
        this.borderColorButton = page.getByTestId("sponsor-border-color");
        };

    async clickSponsorSettingsButton() {
        await this.sponsorSettingsButton.click();
    };

    async enableSponsorToggle() {
        await this.sponsorToggle.click();
        await expect(this.sponsorToggle).toHaveAttribute("data-checked");
    };

    async uploadSponsorLogo(logoUploadData) {
        await this.page.waitForTimeout(1000);
        await this.uploadSponsorLogoInput.setInputFiles(logoUploadData.imageFilePath + logoUploadData.sponsorLogoName);
        await expect(this.page.locator("//p[text()='" + logoUploadData.sponsorLogoName + "']")).toBeVisible();
    };

    async editSponsorText(sponsorObject) {
        await this.fillElementAndWait( this.sponsorTextBox, sponsorObject.sponsorText);
    };

    async changeSponsorPosition() {
        await this.clickElementAndWait(this.positionBottomButton);
    };

    async editSponsorFont(sponsorBgObject) {
        await this.fontFamilyDropdown.selectOption(sponsorBgObject.fontFamily);
        await this.fontStyleDropdown.selectOption(sponsorBgObject.fontStyle);
        await this.fontSizeButton.fill(sponsorBgObject.fontSize);
        await this.clickElementAndWait(this.fontColorButton);
        await this.fillElementAndWait(this.hexColorTextbox, sponsorBgObject.fontHexColor);
    };

    async editSponsorBackground(sponsorBgObject) {
        await this.clickElementAndWait(this.backgroundColorButton);
        await this.fillElementAndWait(this.hexColorTextbox, sponsorBgObject.backgroundHexColor);
        await this.clickElementAndWait(this.backgroundColorButton);

        await this.clickElementAndWait(this.borderColorButton);
        await this.fillElementAndWait(this.hexColorTextbox, sponsorBgObject.borderHexColor);
    };
};

