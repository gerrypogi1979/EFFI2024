const { test } = require('../../fixtures/test.js');

import { URL } from '../../common/constants.js';
import { textWidgetTestData } from '../../common/testdata.js';
import { textWidgetTestId } from '../../common/elements.js';

test('Create and edit Build of Text Widget', async ({ setupBrowser, createEvent, studioTextWidgetPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioTextWidgetPage.addTextWidget(textWidgetTestId.textBlockIcon, textWidgetTestId.textBlockAddButton);
    await studioTextWidgetPage.verifyTextWidgetIsAddedToScene(textWidgetTestId.textBlockIframe);

    await studioTextWidgetPage.fillTextBox(textWidgetTestData);
    await studioTextWidgetPage.verifyTextContentUpdated(textWidgetTestId.textBlockIframe, textWidgetTestData);
});

