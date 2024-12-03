const { test } = require('../../fixtures/test.js');

import { URL, fileName, fileUpload } from '../../common/constants.js'
import { sceneInfo } from '../../common/testdata.js'

test('Rename a scene', async ({ setupBrowser, createEvent, studioLayerSceneSettingsPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);
   
    await studioLayerSceneSettingsPage.openSceneSettingMenu();
    await studioLayerSceneSettingsPage.openSceneThreeDotMenu();
    await studioLayerSceneSettingsPage.editSceneName(sceneInfo.sceneEditedName);
    await studioLayerSceneSettingsPage.verifySceneName(sceneInfo.sceneEditedName);
    //ToDo: verify sceneTitle
});

test('Duplicate a scene', async ({ setupBrowser, createEvent, studioLayerSceneSettingsPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);
   
    await studioLayerSceneSettingsPage.openSceneSettingMenu();
    await studioLayerSceneSettingsPage.openSceneThreeDotMenu();
    await studioLayerSceneSettingsPage.duplicateScene();
    await studioLayerSceneSettingsPage.verifySceneName(sceneInfo.sceneDuplicatedName);
});

test('Delete a scene', async ({ setupBrowser, createEvent, studioLayerSceneSettingsPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);
  
    await studioLayerSceneSettingsPage.openSceneSettingMenu();
    await studioLayerSceneSettingsPage.openSceneThreeDotMenu();
    await studioLayerSceneSettingsPage.deleteScene();
    await studioLayerSceneSettingsPage.verifySceneDeleted();
});

test('Edit scene background color', async ({ setupBrowser, createEvent, studioLayerSceneSettingsPage, studioDesignPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);
    
    await studioLayerSceneSettingsPage.openSceneSettingMenu();
    await studioLayerSceneSettingsPage.addSceneBackgroundColor(sceneInfo);
    await studioDesignPage.verifyCanvasScreenShot(fileName.sceneBackgroundColorCanvas);
});

test('Add scene background image', async ({ setupBrowser, createEvent, studioLayerSceneSettingsPage, studioDesignPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);

    await studioLayerSceneSettingsPage.openSceneSettingMenu();
    await studioLayerSceneSettingsPage.addSceneBackgroundImage(fileUpload.imageFilePath, fileUpload.jpgImageName);
    await studioDesignPage.verifyCanvasScreenShot(fileName.sceneBackgroundImageCanvas);
});

test('Add a new scene', async ({ setupBrowser, createEvent, studioLayerSceneSettingsPage }) => {
    await setupBrowser.goto(URL.eventUrl + createEvent.eventUUID);
    
    await studioLayerSceneSettingsPage.addNewScene();
    await studioLayerSceneSettingsPage.verifyName(sceneInfo.secondSceneName);
});


