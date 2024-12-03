const { test, expect } = require('@playwright/test');

exports.BasePage = class BasePage {

    constructor(page) {
        this.page = page;
    };

    async clickElementAndWait(element) {
        await element.click();
        await this.page.waitForTimeout(1000);
    };

    async doubleClickElement(element, elementVerify) {
        await element.dblclick();
        //temporary fix to open the setting, need to be modified later
         try {
            await expect(elementVerify).toBeVisible();
        } catch (error) {
            await element.dblclick();
        }
    };

    async fillElementAndWait(element, object) {
        await element.fill(object);
        await this.page.waitForTimeout(1000);
    };


    //Upload image if don't have input element:
    // const fileChooserPromise = this.page.waitForEvent('filechooser');
    // await this.page.locator("//p[text()='Add new image']/preceding-sibling::button").click();
    // const fileChooser = await fileChooserPromise;
    // await fileChooser.setFiles("C:\\Users\\tuyen\\effi-e2e\\resources\\bgr_image.jpg");
  
};
