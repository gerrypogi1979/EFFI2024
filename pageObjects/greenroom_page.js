const { expect } = require('@playwright/test');
import { BasePage } from './base_page';

exports.GreenroomPage = class GreenroomPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.greenroomMenuIcon = page.getByTestId("greenroom-menu");
        this.addNewGuestButton = page.getByTestId("new-guest-button");
        this.guestNameTextBox = page.getByTestId("guest-name-textbox");
        this.guestEmailTextBox = page.getByTestId("guest-email-textbox");
        this.guestTitleTextBox = page.getByTestId("guest-title-textbox");
        this.guestLocationTextBox = page.getByTestId("guest-location-textbox");
        this.guestLabelDropdown = page.getByTestId("guest-label-dropdown");
        this.addGuestPhotoInput = page.getByTestId("guest-photo-input");
        this.deleteAvatarButton = page.getByTestId("guest-photo-delete");
        this.nextButton = page.getByTestId("invite-guest-next-button");
        this.closeGuestModalButton = page.getByTestId("close-guest-modal-button");
        this.guestAddedSuccessNotification = page.getByTestId("guest-added-success-message");
        this.threeDotMenu = page.getByTestId("guest-three-dot-menu");
        this.editGuestInfoButton = page.getByTestId("edit-guest-button");
        this.guestUpdatedSuccessNotification = page.getByTestId("guest-updated-success-message");
        this.closeGuestUpdatedNotification = page.getByTestId("close-guest-updated-message");
        this.removeGuestButton = page.getByTestId("remove-guest");
        this.confirmRemoveButton = page.getByTestId("confirm-remove-guest");
    };

    async openGreenroomMenu() {
        await this.greenroomMenuIcon.click();
    };

    async addNewGuest(guestObject, imageFilePath, imageName) {
        await this.addNewGuestButton.click();
        await this.addGuestPhotoInput.setInputFiles(imageFilePath + imageName);
        await expect(this.deleteAvatarButton).toBeVisible();
        await this.guestNameTextBox.fill(guestObject.guestName);
        await this.guestEmailTextBox.fill(guestObject.guestEmail);
        await this.guestTitleTextBox.fill(guestObject.guestTitle);
        await this.guestLocationTextBox.fill(guestObject.guestLocation);
        await this.guestLabelDropdown.selectOption(guestObject.guestLabel);
        await this.nextButton.click();
    };

    async verifyGuestAdded() {
        await expect(this.guestAddedSuccessNotification).toBeVisible();
    };

    async closeGuestOptionsModal() {
        await this.closeGuestModalButton.click();
    };

    async verifyGuestDisplayedOnList(guestName) {
        await expect(this.page.locator("//p[text()='" + guestName + "']")).toBeVisible();
    };

    async openGuestMenu() {
        await this.threeDotMenu.click();
    };

    async editGuestInfo(guestObject) {
        await this.editGuestInfoButton.click();
        await this.guestNameTextBox.fill(guestObject.guestName);
        // wait for the success message displays because the backend here was designed to only save data on each field, in the future we should redesign the UX again to save the entire form 
        await expect(this.guestUpdatedSuccessNotification).toBeVisible();
        await this.closeGuestUpdatedNotification.click();

        //ToDo: reopen this step after the bug is fixed in EFFI-3350
        //await this.guestEmailTextBox.fill(guestObject.guestEmail);
        //await expect(this.guestUpdatedSuccessNotification).toBeVisible();
        //await this.closeGuestUpdateNotification.click();

        await this.guestTitleTextBox.fill(guestObject.guestTitle);
        await expect(this.guestUpdatedSuccessNotification).toBeVisible();
        await this.closeGuestUpdatedNotification.click();

        await this.guestLocationTextBox.fill(guestObject.guestLocation);
        await expect(this.guestUpdatedSuccessNotification).toBeVisible();
        await this.closeGuestUpdatedNotification.click();

        await this.guestLabelDropdown.selectOption(guestObject.guestLabel);
        await expect(this.guestUpdatedSuccessNotification).toBeVisible();
        await this.closeGuestUpdatedNotification.click();
    };

    async removeGuest() {
        await this.removeGuestButton.click();
        await this.confirmRemoveButton.click();
    };

    async verifyGuestRemoved(guestName) {
        await expect(this.page.locator("//p[text()='" + guestName + "']")).toBeHidden();
    }
};