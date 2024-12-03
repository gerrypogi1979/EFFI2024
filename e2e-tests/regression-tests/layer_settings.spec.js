const { test } = require('../../fixtures/test.js');

import { URL } from '../../common/constants.js'
import { sceneInfo } from '../../common/testdata.js'
import { createNewPoll, addNewSceneByApi } from '../../common/apiFunctions.js';

test('Rename a Layer', async ({ setupBrowser, createEvent, studioLayerSceneSettingsPage }) => {
    await createNewPoll(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    let elementEditedName = "Poll e2e testing";

    await studioLayerSceneSettingsPage.openLayerSettingMenu();
    await studioLayerSceneSettingsPage.openLayerThreeDotMenu();
    await studioLayerSceneSettingsPage.editLayerName(elementEditedName);
    await studioLayerSceneSettingsPage.verifyLayerName(elementEditedName);
});

test('Duplicate a Layer', async ({ setupBrowser, createEvent, studioLayerSceneSettingsPage }) => {
    await createNewPoll(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    let elementDuplicatedName = "Copy of Poll";

    await studioLayerSceneSettingsPage.openLayerSettingMenu();
    await studioLayerSceneSettingsPage.openLayerThreeDotMenu();
    await studioLayerSceneSettingsPage.duplicateLayer();
    await studioLayerSceneSettingsPage.verifyName(elementDuplicatedName);
    //ToDo: add visual comparison later here if neccesary
});

test('Copy Layer to other scene', async ({ setupBrowser, createEvent, studioLayerSceneSettingsPage }) => {
    await createNewPoll(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);
    let secondSceneUUID = await addNewSceneByApi(createEvent.request, createEvent.eventUUID, sceneInfo.secondSceneName);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    let elementIframe = "poll-styleA-iframe";

    await studioLayerSceneSettingsPage.openLayerSettingMenu();
    await studioLayerSceneSettingsPage.openLayerThreeDotMenu();
    await studioLayerSceneSettingsPage.copyLayerToOtherScene(sceneInfo.secondSceneName);
    await studioLayerSceneSettingsPage.verifyLayerCoppiedToOtherScene(secondSceneUUID, elementIframe);
    //ToDo: add visual comparison later here if neccesary
});

test('Delete a Layer', async ({ setupBrowser, createEvent, studioLayerSceneSettingsPage }) => {
    await createNewPoll(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    let elementIframe = "poll-styleA-iframe";

    await studioLayerSceneSettingsPage.openLayerSettingMenu();
    await studioLayerSceneSettingsPage.openLayerThreeDotMenu();
    await studioLayerSceneSettingsPage.deleteLayer();
    await studioLayerSceneSettingsPage.verifyLayerIsNotVisible(elementIframe);
    //ToDo: verify by id of the element or relationship with Layers setting if neccesary
});

test('Hide and unhide a Layer', async ({ setupBrowser, createEvent, studioLayerSceneSettingsPage }) => {
    await createNewPoll(createEvent.request, createEvent.eventUUID, createEvent.sceneUUID);

    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    let elementIframe = "poll-styleA-iframe";

    await studioLayerSceneSettingsPage.openLayerSettingMenu();
    await studioLayerSceneSettingsPage.clickEyeIcon(); 
    await studioLayerSceneSettingsPage.verifyLayerIsNotVisible(elementIframe);

    await studioLayerSceneSettingsPage.clickEyeIcon(); 
    await studioLayerSceneSettingsPage.verifyLayerIsVisible(elementIframe);
});


