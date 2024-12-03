# EFFI e2e UI automated testing

## About 
This project will use Playwright framework to develop an end-to-end automated test for EFFI studio application https://studio.effi.xyz. 

The framework contains the test scenarios that can be found [here](https://docs.google.com/spreadsheets/d/14dVhOgHMGl5348mjdJjva03_5-yWlZEE_bMlIZ-UBZ4/edit?usp=sharing)

## Project structure and components
- `e2e-tests` folder: contains all test classes 
- `common` folder: contains methods and properties that can be re-used across the classes such as test data, common methods, API functions and constants
- `pageObjects` folders: contains different classes that represent each page of the website. Each page object has elements and methods to interact with the elements of the page 
- `playwright.config.js` file: is used as a test runner
- `state.json` file: is used to store cookie returned by login API request

## Github actions
In `workflows` folder, there are files used to set up some workflows:
`playwright.yml` file: is used to trigger the test run on every push or new PR to master branch. The workflow is created by default when Playwright was being installed. When a push or new PR event occurs, the workflow will:
- Create a latest ubuntu instance
- Checkout the repo
- Install node 18, Playwright and its dependencies and browsers
- Execute all tests
- Upload test reports if there is any failed test

`update-snapshots.yml` is used to make an update of the reference snapshots used in tests that having visual comparisons. It runs whenever you post a new pull request comment that strictly matches the "/update-snapshots".

## How to run test on CLI 
1. Clone this repository
2. Install playwright using npm, example: `npm init playwright@latest` (remember to install Node.js first to use npm)
3. Run the test using the command  `npx playwright test <name of a specific test file>`
More detailed instructions can be found in this doc https://playwright.dev/docs/intro