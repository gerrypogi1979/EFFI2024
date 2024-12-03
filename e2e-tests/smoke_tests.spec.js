const { test, expect } = require('../fixtures/test.js');
const { chromium } = require('playwright');
const { LoginPage } = require('../pageObjects/login_page.js');
const { DashboardPage } = require('../pageObjects/dashboard_page.js');
const { StudioDesignPage } = require('../pageObjects/studio_design_page.js');
const { StudioPollPage } = require('../pageObjects/studio_polls_page.js');

import { loginAccount, eventInfo } from '../common/testdata.js';
import { URL, successMessage } from '../common/constants.js';
import { pollTestId } from '../common/elements.js';

/*
- log in
- create a new event
- add elements
- start streaming
- delete event
*/

test('Create event and start streaming', async ({}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.grantPermissions(['camera', 'microphone']);
  const page = await context.newPage();
  
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const studioDesignPage = new StudioDesignPage(page);
  const studioPollPage = new StudioPollPage(page);

  await page.goto(URL.loginUrl);
  
  await loginPage.login(loginAccount);
  await dashboardPage.verifyLoginSuccessMessageVisible(successMessage.signInSuccessMessage);
  await dashboardPage.closeLoginSuccessMessage();
  await expect(page).toHaveURL(URL.dashboardUrl);

  await dashboardPage.createNewEvent(eventInfo.eventName);
  await studioDesignPage.verifyEventNameIsCorrect(eventInfo.eventName);

  await studioPollPage.addPollWidget(pollTestId.styleAIcon, pollTestId.styleAAddButton);
  await studioPollPage.verifyPollWidgetIsAddedToScene(pollTestId.styleAIframe);

  // Start streaming: TBD
});

