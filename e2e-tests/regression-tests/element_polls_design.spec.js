const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { pollTestData } from '../../common/testdata.js';
import { createNewPoll } from '../../common/apiFunctions.js';
import { pollTestId } from '../../common/elements.js';

test('Edit Design setting of a Poll', async ({ setupBrowser, createEvent, studioDesignPage, studioPollPage }) => {
    await createNewPoll(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);
   
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioPollPage.doubleClickPollIframe(pollTestId.styleAIframe);
    await studioPollPage.editPollDesign(pollTestData);
    await studioDesignPage.verifyCanvasScreenShot(fileName.pollStyleADesignCanvas);
});

