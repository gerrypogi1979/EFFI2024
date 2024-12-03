const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { QRCodeTestData } from '../../common/testdata.js';
import { qrCodeTestId } from '../../common/elements.js';

test('Create a new QRCode', async ({ setupBrowser, createEvent, studioDesignPage, studioQRCodePage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioQRCodePage.addQRCode(qrCodeTestId.styleAIcon, qrCodeTestId.styleAAddButton);
    await studioQRCodePage.verifyQRCodeWidgetIsAddedToScene(qrCodeTestId.styleAIframe);

    await studioQRCodePage.enterDestinationUrl(QRCodeTestData);
    await studioDesignPage.verifyCanvasScreenShot(fileName.QRCodeStyleACreateCanvas);
});
