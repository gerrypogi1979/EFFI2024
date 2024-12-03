const { test } = require('../../fixtures/test.js');

import { URL, fileName, fileUpload } from '../../common/constants.js';
import { sponsorTestData } from '../../common/testdata.js';
import { pollTestId, meterTestId, qrCodeTestId } from '../../common/elements.js';
import {
  createNewPoll,
  createNewMeter,
  createNewQRCode,
} from '../../common/apiFunctions.js';

test('Upload Sponsor Logo for a Poll', async ({ setupBrowser, createEvent, studioPollPage, studioSponsorSettingsPage, studioDesignPage }) => {
    await createNewPoll(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioPollPage.doubleClickPollIframe(pollTestId.styleAIframe);
    await studioSponsorSettingsPage.enableSponsorToggle();
    await studioSponsorSettingsPage.uploadSponsorLogo(fileUpload);
    await studioDesignPage.verifyCanvasScreenShot(fileName.pollSponsorCanvas);
});

test('Upload Sponsor Logo for a Meter', async ({ setupBrowser, createEvent, studioMeterPage, studioSponsorSettingsPage, studioDesignPage }) => {
    await createNewMeter(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioMeterPage.doubleClickMeterIframe(meterTestId.classicIframe);
    await studioSponsorSettingsPage.enableSponsorToggle();
    await studioSponsorSettingsPage.uploadSponsorLogo(fileUpload);
    await studioDesignPage.verifyCanvasScreenShot(fileName.meterSponsorCanvas);
});

test('Upload Sponsor Logo for a QR Code', async ({ setupBrowser, createEvent, studioQRCodePage, studioSponsorSettingsPage, studioDesignPage }) => {
    await createNewQRCode(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioQRCodePage.doubleClickQRCodeIframe(qrCodeTestId.styleAIframe);
    await studioSponsorSettingsPage.clickSponsorSettingsButton();
    await studioSponsorSettingsPage.enableSponsorToggle();
    await studioSponsorSettingsPage.uploadSponsorLogo(fileUpload);
    await studioDesignPage.verifyCanvasScreenShot(fileName.QRCodeSponsorCanvas);
});

test('Edit sponsor text', async ({ setupBrowser, createEvent, studioPollPage, studioSponsorSettingsPage }) => {
    await createNewPoll(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioPollPage.doubleClickPollIframe(pollTestId.styleAIframe);
    await studioSponsorSettingsPage.enableSponsorToggle();
    await studioSponsorSettingsPage.editSponsorText(sponsorTestData);
    await studioPollPage.verifyPollDetailUpdated(pollTestId.styleAIframe, sponsorTestData.sponsorText);
});

test('Change sponsor position to bottom', async ({ setupBrowser, createEvent, studioPollPage, studioSponsorSettingsPage, studioDesignPage }) => {
    await createNewPoll(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioPollPage.doubleClickPollIframe(pollTestId.styleAIframe);
    await studioSponsorSettingsPage.enableSponsorToggle();
    await studioSponsorSettingsPage.changeSponsorPosition();
    await studioDesignPage.verifyCanvasScreenShot(fileName.pollSponsorBottomCanvas);
});

test('Edit sponsor font', async ({ setupBrowser, createEvent, studioPollPage, studioSponsorSettingsPage, studioDesignPage }) => {
    await createNewPoll(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioPollPage.doubleClickPollIframe(pollTestId.styleAIframe);
    await studioSponsorSettingsPage.enableSponsorToggle();
    await studioSponsorSettingsPage.editSponsorFont(sponsorTestData);
    await studioDesignPage.verifyCanvasScreenShot(fileName.pollSponsorFontCanvas);
});

test('Edit sponsor background', async ({ setupBrowser, createEvent, studioPollPage, studioSponsorSettingsPage, studioDesignPage }) => {
    await createNewPoll(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioPollPage.doubleClickPollIframe(pollTestId.styleAIframe);
    await studioSponsorSettingsPage.enableSponsorToggle();
    await studioSponsorSettingsPage.editSponsorBackground(sponsorTestData);
    await studioDesignPage.verifyCanvasScreenShot(fileName.pollSponsorBackgroundCanvas);
});
