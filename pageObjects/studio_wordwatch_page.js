const { expect } = require('@playwright/test');
import { BasePage } from './base_page';

exports.StudioWordWatchPage = class StudioWordWatchPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.wordWatchAddWidgetSection = page.getByTestId("wordwatch-element-dropdown");
        this.wordWatchWidgetIframe = page.frameLocator('#preview-iframe');
        this.styleSettingButton = page.getByTestId("tracker-style-setting");
        this.confirmChangeStyleButton = page.getByTestId("confirm-change-style");
        this.firstChoiceWordTextBox = page.getByTestId("choice-word-1");
        this.firstChoiceColorButton = page.getByTestId("choice-color-1");
        this.secondChoiceWordTextBox = page.getByTestId("choice-word-2");
        this.secondChoiceColorButton = page.getByTestId("choice-color-2");
        this.deleteThirdChoiceButton = page.getByTestId("delete-word-3");
        this.deleteFourthChoiceButton = page.getByTestId("delete-word-4");
        this.addNewChoiceButton = page.getByTestId("add-new-choice-wordwatch");
        this.newChoiceWordTextBox = page.getByTestId("new-choice-word");
        this.newChoiceColorButton = page.getByTestId("new-choice-color");
        this.confirmAddNewChoiceButton = page.getByTestId("confirm-add-new-choice");
        this.fontFamilyDropdown = page.getByTestId("wordwatch-font-family");
        this.fontStyleDropdown = page.getByTestId("wordwatch-font-style");
        this.fontSizeTextBox = page.getByTestId("wordwatch-font-size");
        this.fontColorButton = page.getByTestId("wordwatch-font-color");
        this.backgroundColorButton = page.getByTestId("wordwatch-background-color");
        this.hexColorTextBox = page.getByTestId("color-picker-hex");
    };

    async addWordWatch(wordwatchIcon, addButton) {
        await this.clickElementAndWait(this.wordWatchAddWidgetSection);

        await this.page.getByTestId(wordwatchIcon).hover();
        await expect(this.page.getByTestId(addButton)).toBeVisible();

        await this.page.getByTestId(addButton).click();
    };

    async verifyWordWatchAddedToScene(wordwatchIframeId) {
        await expect(this.wordWatchWidgetIframe.getByTestId(wordwatchIframeId)).toBeVisible({timeout:10000});
     };

    async verifyWordWatchDetailsUpdated(wordwatchIframeId, wordWatchDetails) {
        await expect(this.wordWatchWidgetIframe.frameLocator("//div[@data-testid='"+ wordwatchIframeId + "']/iframe").locator("//div[text()='" + wordWatchDetails + "']")).toBeVisible();
    };

    async editWordWatchBuild(wordwatchIframeId, choicesObject) {
        await this.firstChoiceWordTextBox.fill(choicesObject.firstChoiceWord);
        await this.verifyWordWatchDetailsUpdated(wordwatchIframeId, choicesObject.firstChoiceWord);

        await this.clickElementAndWait(this.firstChoiceColorButton);
        await this.hexColorTextBox.fill(choicesObject.firstChoiceHexColor);
        await this.clickElementAndWait(this.firstChoiceColorButton);

        await this.secondChoiceWordTextBox.fill(choicesObject.seconChoicedWord);
        await this.verifyWordWatchDetailsUpdated(wordwatchIframeId, choicesObject.seconChoicedWord);

        await this.clickElementAndWait(this.secondChoiceColorButton);
        await this.hexColorTextBox.fill(choicesObject.secondChoiceHexColor);
        await this.clickElementAndWait(this.secondChoiceColorButton);

        await this.clickElementAndWait(this.deleteFourthChoiceButton);
        await this.clickElementAndWait(this.deleteThirdChoiceButton);

        await this.addNewChoiceButton.click();
        await this.newChoiceWordTextBox.fill(choicesObject.newChoicetWord);

        await this.newChoiceColorButton.click();
        await this.hexColorTextBox.fill(choicesObject.newChoiceHexColor);
        await this.newChoiceColorButton.click();

        await this.clickElementAndWait(this.confirmAddNewChoiceButton);
        await this.verifyWordWatchDetailsUpdated(wordwatchIframeId, choicesObject.newChoicetWord);
    };

    async doubleClickWordWatchIframe(wordwatchIframeId) {
        await this.doubleClickElement(this.wordWatchWidgetIframe.getByTestId(wordwatchIframeId), this.backgroundColorButton);    
    };

    async editWordWatchDesign(designWordWatchObject) {
        await this.fontFamilyDropdown.selectOption(designWordWatchObject.fontFamily);
        await this.page.waitForTimeout(1000);
        
        await this.fontStyleDropdown.selectOption(designWordWatchObject.fontStyle);
        await this.page.waitForTimeout(1000);
        await this.fillElementAndWait(this.fontSizeTextBox, designWordWatchObject.fontSize);

        await this.clickElementAndWait(this.fontColorButton);
        await this.hexColorTextBox.fill(designWordWatchObject.fontHexColor);
        await this.clickElementAndWait(this.fontColorButton);

        await this.clickElementAndWait(this.backgroundColorButton);
        await this.hexColorTextBox.fill(designWordWatchObject.backgroundHexColor);
        await this.page.waitForTimeout(3000);
    };

    async clickStyleSettingDropdown() {
        await this.clickElementAndWait(this.styleSettingButton);

    };

    async changeWordWatchStyle(wordwatchIcon) {
        await this.page.getByTestId(wordwatchIcon).click();
        await this.clickElementAndWait(this.confirmChangeStyleButton);
        //sleep added above to let the new style updated to screen because the datatestid of the iframe is still the old style's iframe
    };
};

