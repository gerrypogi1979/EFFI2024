const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { bannerTestData } from '../../common/testdata.js';
import { createNewTickerWithText } from '../../common/apiFunctions.js';
import { bannerTestId } from '../../common/elements.js';

test('Edit Design setting of a Banner Ticker', async ({ setupBrowser, createEvent, studioDesignPage, studioBannersPage }) => {
    await createNewTickerWithText(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID, bannerTestData.tickerTextMultiLines);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioBannersPage.doubleClickBannerIframe(bannerTestId.tickerIframe);
    await studioBannersPage.editBannerDesign(bannerTestData);
    await studioDesignPage.verifyCanvasScreenShot(fileName.bannerTickerDesignCanvas);
});

