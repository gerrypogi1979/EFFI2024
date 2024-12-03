const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { createNewWordWatch } from '../../common/apiFunctions.js';
import { wordwatchTestId } from '../../common/elements.js';

test('Change Style of a WordWatch', async ({ setupBrowser, createEvent, studioDesignPage, studioWordWatchPage }) => {
    await createNewWordWatch(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);
    
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioWordWatchPage.doubleClickWordWatchIframe(wordwatchTestId.classicIframe);
    await studioWordWatchPage.clickStyleSettingDropdown();
    await studioWordWatchPage.changeWordWatchStyle(wordwatchTestId.classicHorizontalIcon);
    await studioDesignPage.verifyCanvasScreenShot(fileName.wordWatchClassicHorizontalCreateCanvas);
});

