const { expect } = require('@playwright/test');
import { BasePage } from './base_page';

exports.StudioPollPage = class StudioPollPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.pollAddWidgetSection = page.getByTestId("polls-element-dropdown");
        this.pollWidgetIframe = page.frameLocator('#preview-iframe'); 
        this.styleSettingButton = page.getByTestId("poll-style-setting");
        this.confirmChangeStyleButton = page.getByTestId("confirm-change-style");
        this.questionTextBox = page.getByTestId("poll-question");
        this.instructionTextBox = page.getByTestId("poll-instructions");
        this.fisrtChoiceNumberTextBox = page.getByTestId("choice-number-1");
        this.fisrtChoiceAnswerTextBox = page.getByTestId("choice-answer-1");
        this.secondChoiceNumberTextBox = page.getByTestId("choice-number-2");
        this.secondChoiceAnswerTextBox = page.getByTestId("choice-answer-2");
        this.deleteThirdChoiceButton = page.getByTestId("delete-choice-3");
        this.deleteFourthChoiceButton = page.getByTestId("delete-choice-4");
        this.addNewChoiceButton = page.getByTestId("add-new-choice");
        this.thirdChoiceNumberTextBox = page.getByTestId("choice-number-3");
        this.thirdChoiceAnswerTextBox = page.getByTestId("choice-answer-3");
        this.fourthChoiceNumberTextBox = page.getByTestId("choice-number-4");
        this.backgroundColorButton = page.getByTestId("poll-background-color");
        this.hexColorTextbox = page.getByTestId("color-picker-hex");
        this.borderColorButton = page.getByTestId("poll-border-color");
        this.resultBgColorButton = page.getByTestId("poll-results-background-color");
        this.backgroundImageButton = page.getByTestId("background-image-settings");
        this.addNewImageButton = page.getByTestId("add-new-background-image");
        this.uploadImageInput = page.getByTestId("image-upload-input");
        this.deleteBgImage = page.getByTestId("delete-background-image");
        this.advanceFontSetting = page.getByTestId("advanced-font-settings");
        this.questionFontFamily = page.getByTestId("question-font-family");
        this.questionFontStyle = page.getByTestId("question-font-style");
        this.questionFontSize = page.getByTestId("input[name='question_font_size']");
        this.questionFontColor = page.getByTestId("question-font-color")
        this.instructionFontFamily = page.getByTestId("instructions-font-family")
        this.instructionFontStyle = page.getByTestId("instructions-font-style")
        this.questionFontSize = page.locator('select[name="question_font_size"]')
        this.instructionFontSize = page.locator('select[name="instructions_font_size"]')
        this.instructionFontColor = page.getByTestId('instructions-font-size')
        this.timerFontFamily = page.getByTestId('timer-font-family')
        this.timerFontStyle = page.getByTestId("timer-font-style")
        this.timerFontSize = page.locator('select[name="timer_font_size"]')
        this.timerFontColor = page.getByTestId("timer-font-color")
        this.choicesFontFamily = page.getByTestId("choices-font-family")
        this.choicesFontStyle = page.getByTestId("choices-font-style")
        this.choicesFontColor = page.getByTestId("choices-font-color")
        this.descriptionFontFamily = page.getByTestId("description-font-family")
        this.descriptionFontStyle = page.getByTestId("description-font-style")
        this.descriptionFontSize = page.locator('select[name="description-font-style"]')
        this.descriptionFontColor = page.getByTestId("description-font-color")
    };

    async verifyEditDescription(fontFamily, fontStyle, fontColor, fontSize) {
        await expect(this.descriptionFontFamily).toHaveValue(fontFamily)
        await expect(this.descriptionFontStyle).toHaveValue(fontStyle)
        await expect(this.descriptionFontSize).toHaveValue(fontColor)
        await expect(this.descriptionFontColor).toHaveValue(fontSize)
    }

    async editDescriptionFont(fontFamily, fontStyle, fontColor, fontSize) {
        await this.descriptionFontFamily.selectOption({ label: fontFamily })
        await this.descriptionFontStyle.selectOption({label: fontStyle})
        await this.descriptionFontSize.selectOption(fontSize)
        await this.descriptionFontColor.click()
        await this.hexColorTextbox.fill(fontColor)
        await this.descriptionFontColor.click()
    }

    async verifyFontChoices(fontFamily, fontStyle, fontColor) {
        await expect(this.choicesFontFamily).toHaveValue(fontFamily)
        await expect(this.choicesFontStyle).toHaveValue(fontStyle)
        await expect(this.choicesFontColor).toHaveValue(fontColor)
    }
    
    async editFontChoices(fontFamily, fontStyle, fontColor) {
        await this.choicesFontFamily.selectOption({ label: fontFamily })
        await this.choicesFontStyle.selectOption({label: fontStyle})
        await this.choicesFontColor.click()
        await this.hexColorTextbox.fill(fontColor)
        await this.choicesFontColor.click()
    }

    async verifyEditFontTimer(fontFamily, fontStyle, fontColor, fontSize) {
        await expect(this.timerFontFamily).toHaveValue(fontFamily)
        await expect(this.timerFontStyle).toHaveValue(fontStyle)
        await expect(this.timerFontColor).toHaveValue(fontColor)
        await expect(this.timerFontSize).toHaveValue(fontSize)
    }

    async editFontTimer(fontFamily, fontStyle, fontColor, fontSize) {
        await this.timerFontFamily.selectOption({ label: fontFamily })
        await this.timerFontStyle.selectOption({label: fontStyle})
        await this.timerFontSize.selectOption(fontSize)
        await this.timerFontColor.click()
        await this.hexColorTextbox.fill(fontColor)
        await this.timerFontColor.click()
    }

    async editFontInstruction(fontFamily, fontStyle, fontColor, fontSize) {
        await this.instructionFontFamily.selectOption({ label: fontFamily })
        await this.instructionFontStyle.selectOption({label: fontStyle})
        await this.instructionFontSize.selectOption(fontSize)
        await this.instructionFontColor.click()
        await this.hexColorTextbox.fill(fontColor)
        await this.instructionFontColor.click()
    }

    async verifyEditFontInstruction(fontFamily, fontStyle, fontColor, fontSize) {
        await expect(this.instructionFontFamily).toHaveValue(fontFamily)
        await expect(this.instructionFontStyle).toHaveValue(fontStyle)
        await expect(this.instructionFontColor).toHaveValue(fontColor)
        await expect(this.instructionFontSize).toHaveValue(fontSize)
    }

    async verifyEditFonts(fontFamily, fontStyle, fontColor, fontSize) {
        await expect(this.questionFontFamily).toHaveValue(fontFamily)
        await expect(this.questionFontStyle).toHaveValue(fontStyle)
        await expect(this.questionFontColor).toHaveValue(fontColor)
        await expect(this.questionFontSize).toHaveValue(fontSize)
    }

    async editFonts(fontFamily, fontStyle, fontColor, fontSize) {
        await this.advanceFontSetting.click();
        await this.questionFontFamily.selectOption({ label: fontFamily });
        await this.questionFontStyle.selectOption({label: fontStyle});
        await this.questionFontSize.selectOption(fontSize)
        await this.questionFontColor.click()
        await this.hexColorTextbox.fill(fontColor)
        await this.questionFontColor.click()
    }

    async addPollWidget(pollIcon, addButton) {
        await this.clickElementAndWait(this.pollAddWidgetSection);

        await this.page.getByTestId(pollIcon).hover();
        await expect(this.page.getByTestId(addButton)).toBeVisible();
        
        await this.page.getByTestId(addButton).click();
    };

    async verifyPollWidgetIsAddedToScene(pollIframeId) {
        await expect(this.pollWidgetIframe.getByTestId(pollIframeId)).toBeVisible({timeout:10000});
    };

    async editQuestionAndInstruction(pollIframeId, buildPollObject) {
        await this.questionTextBox.fill(buildPollObject.question);
        await this.verifyPollDetailUpdated(pollIframeId, buildPollObject.question); 
        await this.instructionTextBox.fill(buildPollObject.instruction);
        await this.verifyPollDetailUpdated(pollIframeId, buildPollObject.instruction); 
    };

    async verifyPollDetailUpdated(pollIframeId, buildPollObject) {
        await expect(this.pollWidgetIframe.frameLocator("//div[@data-testid='" + pollIframeId  + "']/iframe").locator("//p[text()='" + buildPollObject + "']")).toBeVisible({timeout:10000});
    };

    async verifyPollChoicesUpdated(pollIframeId, choicesObject) {
        await expect(this.pollWidgetIframe.frameLocator("//div[@data-testid='" + pollIframeId  + "']/iframe").locator("//p[contains(text(),'" + choicesObject + "')]")).toBeVisible({timeout:10000});
    };

    async editAndDeleteChoices(pollIframeId, choicesObject) {
        await this.fillElementAndWait(this.fisrtChoiceNumberTextBox, choicesObject.firstChoiceNumber);
        await this.page.waitForTimeout(1000);
        await this.verifyPollChoicesUpdated(pollIframeId, choicesObject.firstChoiceNumber);

        await this.fillElementAndWait(this.fisrtChoiceAnswerTextBox, choicesObject.firstChoiceAnswer);
        await this.verifyPollChoicesUpdated(pollIframeId, choicesObject.firstChoiceAnswer);

        await this.fillElementAndWait(this.secondChoiceNumberTextBox, choicesObject.secondChoiceNumber);
        await this.verifyPollChoicesUpdated(pollIframeId, choicesObject.secondChoiceNumber);

        await this.fillElementAndWait(this.secondChoiceAnswerTextBox, choicesObject.secondChoiceAnswer);
        await this.verifyPollChoicesUpdated(pollIframeId, choicesObject.secondChoiceAnswer);

        await this.deleteFourthChoiceButton.click();
        await expect(this.fourthChoiceNumberTextBox).toBeHidden();
        await this.deleteThirdChoiceButton.click();
        await expect(this.thirdChoiceNumberTextBox).toBeHidden();

        await this.addNewChoiceButton.click();
        await expect(this.thirdChoiceNumberTextBox).toBeVisible();

        await this.fillElementAndWait(this.thirdChoiceNumberTextBox,choicesObject.thirdChoiceNumber);
        await this.verifyPollChoicesUpdated(pollIframeId, choicesObject.thirdChoiceNumber);

        await this.fillElementAndWait(this.thirdChoiceAnswerTextBox,choicesObject.thirdChoiceAnswer);
        await this.verifyPollChoicesUpdated(pollIframeId, choicesObject.thirdChoiceAnswer);
    };

    async doubleClickPollIframe(pollIframeId) {
        await this.doubleClickElement(this.pollWidgetIframe.getByTestId(pollIframeId), this.backgroundColorButton);
    };

    async editPollDesign(designPollObject) {
        await this.clickElementAndWait(this.backgroundColorButton);
        await this.hexColorTextbox.fill(designPollObject.backgroundHexColor);
        // this line is to close the hexColor input:
        await this.clickElementAndWait(this.backgroundColorButton);

        await this.clickElementAndWait(this.resultBgColorButton);
        await this.fillElementAndWait(this.hexColorTextbox, designPollObject.resultBgHexColor);
    };

    async uploadBackgroundImage(imageFilePath, imageName) {
        await this.backgroundImageButton.click();
        await this.addNewImageButton.click();
        await this.uploadImageInput.setInputFiles(imageFilePath + imageName);
        await expect(this.page.locator("//img[@alt='" + imageName + "']")).toBeVisible({timeout: 10000});
        await this.clickElementAndWait(this.page.locator("//img[@alt='" + imageName + "']"));
    };

    async deleteBackgroundImage() {
        await this.deleteBgImage.click();
    };

    async clickStyleSettingDropdown() {
        await this.clickElementAndWait(this.styleSettingButton);

    };

    async changePollStyle(pollIcon) {
        await this.page.getByTestId(pollIcon).click();
        await this.confirmChangeStyleButton.click();
    };
};

