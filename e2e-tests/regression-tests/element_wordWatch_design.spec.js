const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { wordWatchTestData } from '../../common/testdata.js';
import { createNewWordWatch } from '../../common/apiFunctions.js';
import { wordwatchTestId } from '../../common/elements.js';

test('Edit Design setting of a Word Watch', async ({ setupBrowser, createEvent, studioDesignPage, studioWordWatchPage }) => {
    await createNewWordWatch(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);
    
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioWordWatchPage.doubleClickWordWatchIframe(wordwatchTestId.classicIframe);
    await studioWordWatchPage.editWordWatchDesign(wordWatchTestData);
    await studioDesignPage.verifyCanvasScreenShot(fileName.wordWatchClassicDesignCanvas);
});

