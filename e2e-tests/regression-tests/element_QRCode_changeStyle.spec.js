const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { createNewQRCode } from '../../common/apiFunctions.js';
import { qrCodeTestId } from '../../common/elements.js';

test('Change Style of a QRCode', async ({ setupBrowser, createEvent, studioDesignPage, studioQRCodePage }) => {
    await createNewQRCode(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);
    
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioQRCodePage.doubleClickQRCodeIframe(qrCodeTestId.styleAIframe);
    await studioQRCodePage.clickStyleSettingDropdown();
    await studioQRCodePage.changeQRCodeStyle(qrCodeTestId.styleBIcon);
    await studioDesignPage.verifyCanvasScreenShot(fileName.QRCodeStyleBCreateCanvas);
});

