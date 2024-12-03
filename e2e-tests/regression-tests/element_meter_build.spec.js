const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { meterWidgetTestData } from '../../common/testdata.js';
import { meterTestId } from '../../common/elements.js';


test('Create and edit Build of a Meter', async ({ setupBrowser, createEvent, studioDesignPage, studioMeterPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioMeterPage.addMeterWidget(meterTestId.classicIcon, meterTestId.classicAddButton);
    await studioMeterPage.verifyMeterWidgetIsAddedToScene(meterTestId.classicIframe);

    await studioMeterPage.editMeterBuild(meterTestId.classicIframe, meterWidgetTestData);
    await studioDesignPage.verifyCanvasScreenShot(fileName.meterStyleClassicBuildCanvas);
});

