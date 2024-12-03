const { test } = require('../../fixtures/test.js');

import { URL } from '../../common/constants.js';
import { eventInfo, meterTestData, pollTestData } from '../../common/testdata.js';
import { pollTestId } from '../../common/elements.js';
import { meterTestId } from '../../common/elements.js';

test('Create and edit Build of a Poll', async ({ setupBrowser, createEvent, studioPollPage, studioDesignPage, studioMeterPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);
    console.log(eventInfo.eventName);

 
    await studioPollPage.addPollWidget(pollTestId.styleAIcon, pollTestId.styleAAddButton);
    
    // Poll - Advance font settings
   
    await studioPollPage.editFonts(pollTestData.font, pollTestData.fontStyle, pollTestData.fontColor, pollTestData.fontSize)
    await studioPollPage.verifyEditFonts(pollTestData.font, pollTestData.fontStyle, pollTestData.fontColor, pollTestData.fontSize)
    
    await studioPollPage.editFontInstruction(pollTestData.font, pollTestData.fontStyle, pollTestData.fontColor, pollTestData.fontSize)
    await studioPollPage.verifyEditFontInstruction(pollTestData.font, pollTestData.fontStyle, pollTestData.fontColor, pollTestData.fontSize)

    await studioPollPage.editFontTimer(pollTestData.font, pollTestData.fontStyle, pollTestData.fontColor, pollTestData.fontSize)
    await studioPollPage.verifyEditFontTimer(pollTestData.font, pollTestData.fontStyle, pollTestData.fontColor, pollTestData.fontSize)
    
    await studioPollPage.editFontChoices(pollTestData.font, pollTestData.fontStyle, pollTestData.fontColor)
    await studioPollPage.verifyFontChoices(pollTestData.font, pollTestData.fontStyle, pollTestData.fontColor)

    await studioPollPage.editDescriptionFont(pollTestData.font, pollTestData.fontStyle, pollTestData.fontColor, pollTestData.fontSize)
    await studioPollPage.verifyEditDescription(pollTestData.font, pollTestData.fontStyle, pollTestData.fontColor, pollTestData.fontSize)


    // Meter - Advance font settings note this needs to go on seperate file. 
    await studioMeterPage.addMeterWidget(meterTestId.classicIcon, meterTestId.classicAddButton);
    await studioMeterPage.editQuestionFont(meterTestData.font, meterTestData.fontStyle, meterTestData.fontColor, meterTestData.fontSize)
    await studioMeterPage.verifyEditQuestion(meterTestData.font, meterTestData.fontStyle, meterTestData.fontColor, meterTestData.fontSize)

});

