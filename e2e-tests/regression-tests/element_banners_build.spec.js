const { test } = require('../../fixtures/test.js');

import { URL } from '../../common/constants.js';
import { bannerTestData } from '../../common/testdata.js';
import { bannerTestId } from '../../common/elements.js';


test('Create and edit Build of Banner', async ({ setupBrowser, createEvent, studioBannersPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioBannersPage.addBanner(bannerTestId.tickerIcon, bannerTestId.tickerAddButton);
    await studioBannersPage.verifyBannerAddedToScene(bannerTestId.tickerIframe);
 
    await studioBannersPage.editBannerBuild(bannerTestData);
    await studioBannersPage.verifyBannerTextUpdated(bannerTestId.tickerIframe, bannerTestData);
});