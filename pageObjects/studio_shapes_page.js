const { expect } = require('@playwright/test');
import { BasePage } from './base_page';

exports.StudioShapesPage = class StudioShapesPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.shapesAddWidgetSection = page.getByTestId("shapes-element-dropdown");
        this.shapeWidgetIframe = page.frameLocator('#preview-iframe');
        this.styleSettingButton = page.getByTestId("shape-style-setting");
        this.confirmChangeStyleButton = page.getByTestId("confirm-change-style");
        this.colorButton = page.getByTestId("shape-color-button");
        this.hexColorTextbox = page.getByTestId("color-picker-hex");
        this.lineStyleDropdown = page.getByTestId("line-style-dropdown");
    };

    async addShapeWidget(shapeIcon, addButton) {
        await this.clickElementAndWait(this.shapesAddWidgetSection);

        await this.page.getByTestId(shapeIcon).hover();
        await expect(this.page.getByTestId(addButton)).toBeVisible();
        
        await this.page.getByTestId(addButton).click();
    };

    async verifyShapeWidgetIsAddedToScene(shapeIframeId) {
        await expect(this.shapeWidgetIframe.getByTestId(shapeIframeId)).toBeVisible({timeout:10000});
    };

    async doubleClickShapeIframe(shapeIframeId) {
        await this.doubleClickElement(this.shapeWidgetIframe.getByTestId(shapeIframeId), this.colorButton);
    };

    async editShapeDesign(designShapeObject) {
        await this.page.waitForTimeout(1000);
        await this.clickElementAndWait(this.colorButton);
        await this.hexColorTextbox.fill(designShapeObject.hexColor);
        // this line is to close the hexColor input:
        await this.clickElementAndWait(this.colorButton);
        await this.lineStyleDropdown.selectOption(designShapeObject.lineStyle);
        await this.page.waitForTimeout(3000);
    };

    async clickStyleSettingDropdown() {
        await this.clickElementAndWait(this.styleSettingButton);

    };

    async changeShapeStyle(shapeIcon) {
        await this.page.getByTestId(shapeIcon).click();
        await this.clickElementAndWait(this.confirmChangeStyleButton);
        //sleep added above to let the new style updated to screen because the datatestid of the iframe is still the old style's iframe
    };
};

