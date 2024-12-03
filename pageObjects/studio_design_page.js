const { expect } = require('@playwright/test');
import { BasePage } from './base_page';


exports.StudioDesignPage = class StudioDesignPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.studioTitle = this.page.getByTestId("studio-title");
        this.setDestinationButton = page.getByText("Set Destination");
        this.addNewDestinationButton = page.getByText("Add new destinations");
        this.eventCanvas = page.locator('#preview-iframe');
        this.duplicatedEventSuccessNotification = page.getByTestId("duplicate-event-success-message");
    };

    async verifyEventNameIsCorrect(eventName) {
        await expect(this.page.getByText(eventName)).toBeVisible({ timeout: 10000 });
    };

    async getEventUUID() {
        let eventUrl = this.page.url();
        return eventUrl.split("events/")[1];
    }; 

    async verifyCanvasScreenShot(fileName) {
        await expect(this.eventCanvas).toHaveScreenshot(fileName);
    };

    async verifyDuplicatedEventSuccessMessage() {
        await expect(this.duplicatedEventSuccessNotification).toBeVisible();
    };

    async verifyStudioTitleVisible() {
        await expect(this.studioTitle).toBeVisible();
    }
};

