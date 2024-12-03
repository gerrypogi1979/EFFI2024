const { expect } = require('@playwright/test');
import { BasePage } from './base_page';

exports.StudioMeterPage = class StudioMeterPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.meterAddWidgetSection = page.getByTestId("meter-element-dropdown");
        this.meterWidgetIframe = page.frameLocator('#preview-iframe');
        this.styleSettingButton = page.getByTestId("meter-style-setting");
        this.confirmChangeStyleButton = page.getByTestId("confirm-change-style");
        this.questionTextBox = page.getByTestId("meter-question");
        this.leftOptionTextBox = page.getByTestId("meter-left-option");
        this.leftOptionAnswersTextBox = page.getByTestId("left-answer");
        this.rightOptionTextBox = page.getByTestId("meter-right-option");
        this.rightOptionAnswersTextBox = page.getByTestId("right-answer");
        this.backgroundColorButton = page.getByTestId("meter-background-color");
        this.hexColorTextbox = page.getByTestId("color-picker-hex");
        this.borderColorButton = page.getByTestId("meter-border-color");
        this.leftOptionColorButton = page.getByTestId("left-color");
        this.rightOptionColorButton = page.getByTestId("right-color");
        this.pointerColorButton = page.getByTestId("pointer-color");
        this.advanceFontSetting = page.locator('p:text("Advanced font settings")');
        this.questionFontFamily = page.getByTestId("question-font-family");
        this.questionFontStyle = page.getByTestId("question-font-style");
        this.questionFontSize = page.getByTestId("input[name='question_font_size']");
        this.questionFontColor = page.getByTestId("question-font-color")
        this.elementMenuIcon = page.getByTestId("elements-menu-icon")
    };

    async verifyEditQuestion(fontFamily, fontStyle, fontColor, fontSize) {
    // TBC
    }

    async editQuestionFont(fontFamily, fontStyle, fontColor, fontSize) {
        await this.advanceFontSetting.click()
        await this.questionFontFamily.selectOption({ label: fontFamily });
        await this.questionFontStyle.selectOption({label: fontStyle});
        await this.questionFontSize.selectOption(fontSize)
        await this.questionFontColor.click()
        await this.hexColorTextbox.fill(fontColor)
        await this.questionFontColor.click()
    }

    async addMeterWidget(meterIcon, addButton) {
        await this.clickElementAndWait(this.meterAddWidgetSection);

        await this.page.getByTestId(meterIcon).hover();
        await expect(this.page.getByTestId(addButton)).toBeVisible();

        await this.page.getByTestId(addButton).click();
    };

    async verifyMeterWidgetIsAddedToScene(meterIframeId) {
        await expect(this.meterWidgetIframe.getByTestId(meterIframeId)).toBeVisible({timeout:10000});
    };

    async verifyMeterDetailsUpdated(meterIframeId, meterDetails) {
        await expect(this.meterWidgetIframe.frameLocator("//div[@data-testid='" + meterIframeId + "']/iframe").locator("//p[contains(text(),'" + meterDetails + "')]")).toBeVisible();
    };

    async editMeterBuild(meterIframeId, buildMeterObject) {
        await this.questionTextBox.fill(buildMeterObject.question);
        await this.verifyMeterDetailsUpdated(meterIframeId, buildMeterObject.question);

        await this.leftOptionTextBox.fill(buildMeterObject.leftOption);
        await this.verifyMeterDetailsUpdated(meterIframeId, buildMeterObject.leftOption);

        await this.fillElementAndWait(this.leftOptionAnswersTextBox, buildMeterObject.leftOptionAnswer);

        await this.rightOptionTextBox.fill(buildMeterObject.rightOption);
        await this.verifyMeterDetailsUpdated(meterIframeId, buildMeterObject.rightOption);

        await this.fillElementAndWait(this.rightOptionAnswersTextBox, buildMeterObject.rightOptionAnswer);
    };

    async doubleClickMeterIframe(meterIframeId) {
        await this.doubleClickElement(this.meterWidgetIframe.getByTestId(meterIframeId),this.backgroundColorButton);
    };

    async editMeterDesign(designMeterObject) {
        await this.clickElementAndWait(this.backgroundColorButton);
        await this.hexColorTextbox.fill(designMeterObject.backgroundHexColor);
        await this.clickElementAndWait(this.backgroundColorButton);

        await this.clickElementAndWait(this.leftOptionColorButton);
        await this.hexColorTextbox.fill(designMeterObject.leftOptionHexColor);
        await this.clickElementAndWait(this.leftOptionColorButton);

        await this.clickElementAndWait(this.rightOptionColorButton);
        await this.hexColorTextbox.fill(designMeterObject.rightOptionHexColor);
        await this.clickElementAndWait(this.rightOptionColorButton);

        await this.clickElementAndWait(this.pointerColorButton);
        await this.fillElementAndWait(this.hexColorTextbox, designMeterObject.pointerHexColor);
    };

    async clickStyleSettingDropdown() {
        await this.clickElementAndWait(this.styleSettingButton);

    };

    async changeMeterStyle(meterIcon) {
        await this.page.getByTestId(meterIcon).click();
        await this.confirmChangeStyleButton.click();
    };
};

