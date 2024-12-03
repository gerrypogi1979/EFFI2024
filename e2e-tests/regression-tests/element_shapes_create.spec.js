const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { shapeTestId } from '../../common/elements.js';

test('Create a new Shape', async ({ setupBrowser, createEvent, studioDesignPage, studioShapesPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioShapesPage.addShapeWidget(shapeTestId.lineIcon,shapeTestId.lineAddButton);
    await studioShapesPage.verifyShapeWidgetIsAddedToScene(shapeTestId.lineIframe);
    await studioDesignPage.verifyCanvasScreenShot(fileName.shapeLineCreateCanvas);
});
