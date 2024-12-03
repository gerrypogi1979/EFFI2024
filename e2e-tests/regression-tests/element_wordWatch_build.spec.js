const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { wordWatchTestData } from '../../common/testdata.js';
import { wordwatchTestId } from '../../common/elements.js';


test('Create and edit Build of Word Watch', async ({ setupBrowser, createEvent, studioDesignPage, studioWordWatchPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioWordWatchPage.addWordWatch(wordwatchTestId.classicIcon, wordwatchTestId.classicAddButton);
    await studioWordWatchPage.verifyWordWatchAddedToScene(wordwatchTestId.classicIframe);

    await studioWordWatchPage.editWordWatchBuild(wordwatchTestId.classicIframe, wordWatchTestData);
    await studioDesignPage.verifyCanvasScreenShot(fileName.wordWatchClassicBuildCanvas);
});

