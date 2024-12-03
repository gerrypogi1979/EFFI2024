const { test } = require('../../fixtures/test.js');

import { URL, fileName } from '../../common/constants.js';
import { shapeWidgetTestData } from '../../common/testdata.js'
import { createNewShape } from '../../common/apiFunctions.js';
import { shapeTestId } from '../../common/elements.js';

test('Edit Design setting of a Shape', async ({ setupBrowser, createEvent, studioDesignPage, studioShapesPage }) => {
    await createNewShape(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);
    
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioShapesPage.doubleClickShapeIframe(shapeTestId.lineIframe);
    await studioShapesPage.editShapeDesign(shapeWidgetTestData);
    await studioDesignPage.verifyCanvasScreenShot(fileName.shapeLineDesignCanvas);
});

