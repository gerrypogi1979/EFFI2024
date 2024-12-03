const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { QRCodeTestData } from '../../common/testdata.js';
import { createNewQRCode } from '../../common/apiFunctions.js';
import { qrCodeTestId } from '../../common/elements.js';

test('Edit Design setting of a QRCode', async ({ setupBrowser, createEvent, studioDesignPage, studioQRCodePage }) => {
    await createNewQRCode(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);
    
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioQRCodePage.doubleClickQRCodeIframe(qrCodeTestId.styleAIframe);
    await studioQRCodePage.clickDesignDropdown();
    await studioQRCodePage.editQRCodeDesign(QRCodeTestData);
    await studioDesignPage.verifyCanvasScreenShot(fileName.QRCodeStyleADesignCanvas);
});

