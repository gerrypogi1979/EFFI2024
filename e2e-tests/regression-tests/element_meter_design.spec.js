const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js'
import { meterWidgetTestData } from '../../common/testdata.js'
import { createNewMeter } from '../../common/apiFunctions.js';
import { meterTestId } from '../../common/elements.js';

test('Edit Design setting of a Meter', async ({ setupBrowser, createEvent, studioDesignPage, studioMeterPage }) => {
    await createNewMeter(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);
   
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioMeterPage.doubleClickMeterIframe(meterTestId.classicIframe);
    await studioMeterPage.editMeterDesign(meterWidgetTestData);
    await studioDesignPage.verifyCanvasScreenShot(fileName.meterStyleClassicDesignCanvas);
});

