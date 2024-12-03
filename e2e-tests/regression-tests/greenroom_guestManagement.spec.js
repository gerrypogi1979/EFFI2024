const { test } = require('../../fixtures/test.js');

import { URL, fileUpload } from '../../common/constants.js';
import { guestInfo } from '../../common/testdata.js';
import { addNewGuest } from '../../common/apiFunctions.js';

test('Add new Guest', async ({ setupBrowser, createEvent, greenroomPage }) => {

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await greenroomPage.openGreenroomMenu();
    await greenroomPage.addNewGuest(guestInfo, fileUpload.imageFilePath, fileUpload.avatarImageName);
    await greenroomPage.verifyGuestAdded();
    await greenroomPage.closeGuestOptionsModal();
    await greenroomPage.verifyGuestDisplayedOnList(guestInfo.guestName);
});

test('Edit Guest info', async ({ setupBrowser, createEvent, greenroomPage }) => {
    let guestEditedInfo = {
        "guestName": "Guest Testing",
        "guestEmail": "effiguesttesting@yopmail.com",
        "guestTitle": "Manager",
        "guestLocation": "Toronto",
        "guestLabel": "Producer"
    };

    await addNewGuest(createEvent.request, createEvent.eventUUID, guestInfo);
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await greenroomPage.openGreenroomMenu();
    await greenroomPage.openGuestMenu();
    await greenroomPage.editGuestInfo(guestEditedInfo);
    await greenroomPage.closeGuestOptionsModal();
    await greenroomPage.verifyGuestDisplayedOnList(guestEditedInfo.guestName);
});

test('Remove Guest', async ({ setupBrowser, createEvent, greenroomPage }) => {

    await addNewGuest(createEvent.request, createEvent.eventUUID, guestInfo);
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await greenroomPage.openGreenroomMenu();
    await greenroomPage.openGuestMenu();
    await greenroomPage.removeGuest();
    await greenroomPage.verifyGuestRemoved(guestInfo.guestName);
});


