// @ts-check
const { test } = require('@playwright/test');

import { authenticateAndStoreCookie, deleteAllTestEvent } from '../common/apiFunctions.js';

test.skip('Delete all Automated Test Events', async ({ request }) => {
    await authenticateAndStoreCookie(request);
    await deleteAllTestEvent(request);
}); 