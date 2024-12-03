const base = require('@playwright/test');
const { chromium } = require('playwright');
const { DashboardPage } = require('../pageObjects/dashboard_page.js');
const { StudioDesignPage } = require('../pageObjects/studio_design_page.js');
const { GreenroomPage } = require('../pageObjects/greenroom_page.js');
const { StudioLayerSceneSettingsPage } = require('../pageObjects/studio_layer_scene_setttings_page.js');
const { StudioMediaLibraryPage } = require('../pageObjects/studio_media_library_page.js');
const { StudioPollPage } = require('../pageObjects/studio_polls_page.js');
const { StudioMeterPage } = require('../pageObjects/studio_meter_page.js');
const { StudioShapesPage } = require('../pageObjects/studio_shapes_page.js');
const { StudioQRCodePage } = require('../pageObjects/studio_QRCode_page.js');
const { StudioWordWatchPage } = require('../pageObjects/studio_wordwatch_page.js');
const { StudioTextWidgetPage } = require('../pageObjects/studio_textWidget_page.js');
const { StudioBannersPage } = require('../pageObjects/studio_banners_page.js');
const { StudioSponsorSettingsPage } = require('../pageObjects/studio_sponsor_settings_page.js');

import { fileName } from '../common/constants.js'
import { authenticateAndStoreCookie, createNewEventAndStoreEventId, getSceneId, deleteEvent } from '../common/apiFunctions.js';

exports.test = base.test.extend({
    loginUI: async ({}, use) => {
        const browser = await chromium.launch();
        const context = await browser.newContext({ storageState: fileName.cookieFile });
        await context.grantPermissions(['camera', 'microphone']);
        const loginUI = await context.newPage();
        await use(loginUI);
    },

    setupBrowser: async ({ request }, use) => {
        await authenticateAndStoreCookie(request);
        const browser = await chromium.launch();
        const context = await browser.newContext({ storageState: fileName.cookieFile });
        await context.grantPermissions(['camera', 'microphone']);
        const setupBrowser = await context.newPage();
        await use(setupBrowser);
    },

    createEvent: async ({ request }, use) => {
        const eventUUID = await createNewEventAndStoreEventId(request);
        const sceneUUID = await getSceneId(request, eventUUID);
        await use({ request, eventUUID, sceneUUID });
        await deleteEvent(request, eventUUID);
    },
    
    dashboardPage: async ({ setupBrowser }, use) => {
        const dashboardPage = new DashboardPage(setupBrowser);
        await use(dashboardPage);
    },

    studioDesignPage: async ({ setupBrowser }, use) => {
        const studioDesignPage = new StudioDesignPage(setupBrowser);
        await use(studioDesignPage);
    },

    greenroomPage: async ({ setupBrowser }, use) => {
        const greenroomPage = new GreenroomPage(setupBrowser);
        await use(greenroomPage);
    },

    studioLayerSceneSettingsPage: async ({ setupBrowser }, use) => {
        const studioLayerSceneSettingsPage = new StudioLayerSceneSettingsPage(setupBrowser);
        await use(studioLayerSceneSettingsPage);
    },

    studioMediaLibraryPage: async ({ setupBrowser }, use) => {
        const studioMediaLibraryPage = new StudioMediaLibraryPage(setupBrowser);
        await use(studioMediaLibraryPage);
    },

    studioPollPage: async ({ setupBrowser }, use) => {
        const studioPollPage = new StudioPollPage(setupBrowser);
        await use(studioPollPage);
    },

    studioMeterPage: async ({ setupBrowser }, use) => {
        const studioMeterPage = new StudioMeterPage(setupBrowser);
        await use(studioMeterPage);
    },

    studioShapesPage: async ({ setupBrowser }, use) => {
        const studioShapesPage = new StudioShapesPage(setupBrowser);
        await use(studioShapesPage);
    },

    studioQRCodePage: async ({ setupBrowser }, use) => {
        const studioQRCodePage = new StudioQRCodePage(setupBrowser);
        await use(studioQRCodePage);
    },
    
    studioWordWatchPage: async ({ setupBrowser }, use) => {
        const studioWordWatchPage = new StudioWordWatchPage(setupBrowser);
        await use(studioWordWatchPage);
    },

    studioTextWidgetPage: async ({ setupBrowser }, use) => {
        const studioTextWidgetPage = new StudioTextWidgetPage(setupBrowser);
        await use(studioTextWidgetPage);
    },

    studioBannersPage: async ({ setupBrowser }, use) => {
        const studioBannersPage = new StudioBannersPage(setupBrowser);
        await use(studioBannersPage);
    },

    studioSponsorSettingsPage: async ({ setupBrowser }, use) => {
        const studioSponsorSettingsPage = new StudioSponsorSettingsPage(setupBrowser);
        await use(studioSponsorSettingsPage);
    },
});
exports.expect = base.expect;