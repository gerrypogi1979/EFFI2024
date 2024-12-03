const { test } = require('../../fixtures/test.js');

import { URL, fileName, fileUpload, imageUpload } from '../../common/constants.js'
import { eventInfo } from '../../common/testdata.js'
import {directUpload} from '../../common/apiFunctions.js'

// ToDo: split this test to smaller tests after figuring how to using Api to upload image
test('Upload a new image JPG to media library', async ({ setupBrowser, createEvent, studioMediaLibraryPage, studioDesignPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    //upload image
    await studioMediaLibraryPage.openMediaLibrarySettingMenu();
    await studioMediaLibraryPage.uploadNewImage(fileUpload.imageFilePath, fileUpload.jpgImageName);
    await studioMediaLibraryPage.verifyImageUploaded(fileUpload.jpgImageName);

    // use image as background
    await studioMediaLibraryPage.openThreeDotMenuSetting(fileUpload.jpgImageName);
    await studioMediaLibraryPage.useImageAsBackground();
    await studioDesignPage.verifyCanvasScreenShot(fileName.sceneBackgroundImageCanvas);

    //delete image
    await studioMediaLibraryPage.openThreeDotMenuSetting(fileUpload.jpgImageName);
    await studioMediaLibraryPage.deleteImage();
    await studioMediaLibraryPage.verifyImageDeleted(fileUpload.jpgImageName);
});

test('Upload a new image JPEG to media library', async ({ setupBrowser, createEvent, studioMediaLibraryPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioMediaLibraryPage.openMediaLibrarySettingMenu();
    await studioMediaLibraryPage.uploadNewImage(fileUpload.imageFilePath, fileUpload.jpegImageName);
    await studioMediaLibraryPage.verifyImageUploaded(fileUpload.jpegImageName);
});

test('Upload a new image PNG to media library', async ({ setupBrowser, createEvent, studioMediaLibraryPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioMediaLibraryPage.openMediaLibrarySettingMenu();
    await studioMediaLibraryPage.uploadNewImage(fileUpload.imageFilePath, fileUpload.pngImageName);
    await studioMediaLibraryPage.verifyImageUploaded(fileUpload.pngImageName);
});

// Reopen this test after figuring how to using Api to upload image
// test('Use image as scene background', async ({ setupBrowser, createEvent, studioMediaLibraryPage }) => {

// await directUpload(createEvent.request, imageUpload.jpgImage, createEvent.eventUUID);
// await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

// await studioMediaLibraryPage.openMediaLibrarySettingMenu();
//await studioMediaLibraryPage.openThreeDotMenuSetting(fileUpload.jpgImageName);
//await studioMediaLibraryPage.useImageAsBackground();

//});