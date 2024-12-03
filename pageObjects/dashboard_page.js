const { expect } = require('@playwright/test');
import { BasePage } from './base_page';

exports.DashboardPage = class DashboardPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.loginSuccessNotification = page.getByTestId("singed-in-success-message");
        this.closeSuccessNotificationButton = page.getByTestId("close-singed-in-message");
        this.createNewEventButton = page.getByTestId("create-event-button");
        this.eventNameTextBox = page.getByTestId("event-name-textbox");
        this.saveOpenStudioButton = page.getByTestId("save-new-event-button");
        this.editEventNameTextBox = page.getByTestId("edit-event-name-textbox");
        this.confirmSaveEventNameButton = page.getByTestId("confirm-save-event-name");
        this.confirmDuplicateEventButton = page.getByTestId("confirm-duplicate-event-name");
        this.confirmDeleteEventButton = page.getByTestId("confirm-delete-event");
    };

    async verifyLoginSuccessMessageVisible(successMessage) {
        await expect(this.loginSuccessNotification).toHaveText(successMessage);
    };

    async closeLoginSuccessMessage() {
        await this.closeSuccessNotificationButton.click();
    };

    async createNewEvent(eventName) {
        await this.createNewEventButton.click();
        await this.eventNameTextBox.fill(eventName);
        await this.saveOpenStudioButton.click();
    };

    async clickThreeDotMenu(eventID) {
        await this.page.locator("//div[@id='card-" + eventID + "']//button").first().click();
    };

    async editEventName(eventID, eventName) {
        await this.page.locator("//div[@id='card-" + eventID + "']//span[text()='Rename']").click();
        await this.editEventNameTextBox.fill(eventName);
        await this.confirmSaveEventNameButton.click();
    };
   
    async verifyEventName(eventID, eventName) {
        await expect(this.page.locator("//div[@id='card-" + eventID + "']//p[text()='" + eventName + "']")).toBeVisible();
    };

    async duplicateEvent(eventID) {
        await this.page.locator("//div[@id='card-" + eventID + "']//span[text()='Duplicate']").click();
        await this.confirmDuplicateEventButton.click();
    };

    async verifyEventCardVisible(eventID) {
        await expect(this.page.locator("//div[@id='card-" + eventID + "']")).toBeVisible({timeout: 30000});
    };

    async deleteEvent(eventID) {
        await this.page.locator("//div[@id='card-" + eventID + "']//span[text()='Delete']").click();
        await this.confirmDeleteEventButton.click();
    };

    async verifyEventCardInvisible(eventID) {
        await expect(this.page.locator("//div[@id='card-" + eventID + "']")).toBeHidden({timeout: 30000});
    };
};