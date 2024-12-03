const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { textWidgetTestData } from '../../common/testdata.js';
import { createNewTextWidget } from '../../common/apiFunctions.js';
import { textWidgetTestId } from '../../common/elements.js';

test('Edit Design setting of a Text Widget', async ({ setupBrowser, createEvent, studioDesignPage, studioTextWidgetPage }) => {
    await createNewTextWidget(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioTextWidgetPage.doubleClickTextWidgetIframe(textWidgetTestId.textBlockIframe);
    await studioTextWidgetPage.editTextWidgetDesign(textWidgetTestData);
    await studioDesignPage.verifyCanvasScreenShot(fileName.textBlockDesignCanvas);
});

