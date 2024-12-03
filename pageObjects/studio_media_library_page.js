const { expect } = require('@playwright/test');
import { BasePage } from './base_page';


exports.StudioMediaLibraryPage = class StudioMediaLibraryPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.mediaLibraryMenuIcon = page.getByTestId("media-library-menu-icon");
        this.uploadImageInput = page.getByTestId("image-upload-input");
        this.threeDotMenuButton = page.getByTestId("media-three-dot-menu");
        this.useAsBackgroundButton = page.getByTestId("use-as-background-button");
        this.deleteImageButton = page.getByTestId("delete-media-button");
        this.confirmDeleteButton = page.getByTestId("confirm-delete-media");
    };

    async openMediaLibrarySettingMenu() {
        await this.clickElementAndWait(this.mediaLibraryMenuIcon);
    };

    async uploadNewImage(imageFilePath, imageName) {
        await this.uploadImageInput.setInputFiles(imageFilePath + imageName);
    };

    async verifyImageUploaded(imageName) {
        await expect(this.page.locator("//img[@alt='" + imageName + "']")).toBeVisible({timeout: 10000});
    }

    async openThreeDotMenuSetting(imageName) {
        //remove this timeout after splitting tests
        await this.page.waitForTimeout(1000);
        await this.page.locator("//img[@alt='" + imageName + "']").hover();
        await expect(this.threeDotMenuButton).toBeVisible();
        await this.threeDotMenuButton.click();
    };

    async useImageAsBackground() {
        await this.clickElementAndWait(this.useAsBackgroundButton);
    };

    async deleteImage() {
        await this.deleteImageButton.click();
        await this.confirmDeleteButton.click();
    };

    async verifyImageDeleted(imageName) {
    await expect(this.page.locator("//img[@alt='" + imageName + "']")).toBeHidden();
    };
};