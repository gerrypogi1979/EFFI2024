const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { eventInfo, pollTestData } from '../../common/testdata.js';
import { pollTestId } from '../../common/elements.js';

test('Create and edit Build of a Poll', async ({ setupBrowser, createEvent, studioPollPage, studioDesignPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);
    console.log(eventInfo.eventName);

    await studioPollPage.addPollWidget(pollTestId.styleAIcon, pollTestId.styleAAddButton);
    await studioPollPage.verifyPollWidgetIsAddedToScene(pollTestId.styleAIframe);

    await studioPollPage.editQuestionAndInstruction(pollTestId.styleAIframe, pollTestData);
    await studioPollPage.editAndDeleteChoices(pollTestId.styleAIframe, pollTestData);
    await studioDesignPage.verifyCanvasScreenShot(fileName.pollStyleABuildCanvas);
});

