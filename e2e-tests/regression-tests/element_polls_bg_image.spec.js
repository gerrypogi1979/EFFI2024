const { test } = require('../../fixtures/test.js');

import { URL, fileName, fileUpload } from '../../common/constants.js'
import { createNewPoll } from '../../common/apiFunctions.js';
import { pollTestId } from '../../common/elements.js';

test('Upload background image of a Poll', async ({ setupBrowser, createEvent, studioPollPage, studioDesignPage }) => {
    await createNewPoll(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);
    
    setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioPollPage.doubleClickPollIframe(pollTestId.styleAIframe);
    await studioPollPage.uploadBackgroundImage(fileUpload.imageFilePath, fileUpload.jpgImageName); 
    await studioDesignPage.verifyCanvasScreenShot(fileName.pollBackgroundImageCanvas);
});

