const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { createNewShape } from '../../common/apiFunctions.js';
import { shapeTestId } from '../../common/elements.js';

test('Change Style of a Shape', async ({ setupBrowser, createEvent, studioDesignPage, studioShapesPage }) => {
    await createNewShape(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);
    
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioShapesPage.doubleClickShapeIframe(shapeTestId.lineIframe);
    await studioShapesPage.clickStyleSettingDropdown();
    await studioShapesPage.changeShapeStyle(shapeTestId.arrowIcon);
    await studioDesignPage.verifyCanvasScreenShot(fileName.shapeArrowCreateCanvas);
});

