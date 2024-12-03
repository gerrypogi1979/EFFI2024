const { test } = require('../../fixtures/test.js');

import { URL } from '../../common/constants.js'
import { eventInfo } from '../../common/testdata.js'

test('Rename an event', async ({ setupBrowser, createEvent, dashboardPage }) => {
    let eventID = createEvent.eventUUID;
    let editedEventName = eventInfo.eventName + " Edited";

    await setupBrowser.goto(URL.dashboardUrl);
    await dashboardPage.clickThreeDotMenu(eventID);
    await dashboardPage.editEventName(eventID, editedEventName);
    await dashboardPage.verifyEventName(eventID, editedEventName);
});

test('Duplicate an event', async ({ setupBrowser, createEvent, dashboardPage, studioDesignPage }) => {
    let eventID = createEvent.eventUUID;
    let duplicatedEventName = "Copy of " + eventInfo.eventName;

    await setupBrowser.goto(URL.dashboardUrl);
    await dashboardPage.clickThreeDotMenu(eventID);
    await dashboardPage.duplicateEvent(eventID);
    await studioDesignPage.verifyDuplicatedEventSuccessMessage();
    await studioDesignPage.verifyStudioTitleVisible();
    await studioDesignPage.verifyEventNameIsCorrect(duplicatedEventName);

    let duplicatedEventID = await studioDesignPage.getEventUUID();
    
    await setupBrowser.goto(URL.dashboardUrl);
    await dashboardPage.verifyEventCardVisible(duplicatedEventID);
    await dashboardPage.verifyEventName(duplicatedEventID, duplicatedEventName);
});

test('Delete an event', async ({ setupBrowser, createEvent, dashboardPage, studioDesignPage }) => {
    let eventID = createEvent.eventUUID;

    await setupBrowser.goto(URL.dashboardUrl);
    await dashboardPage.clickThreeDotMenu(eventID);
    await dashboardPage.deleteEvent(eventID);
    await dashboardPage.verifyEventCardInvisible(eventID);
});
