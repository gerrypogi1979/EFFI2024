const { test, expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailTextbox = page.getByTestId("email-textbox");
        this.passwordTextbox = page.getByTestId("password-textbox");
        this.continueButton = page.getByTestId("login-continue-button");
        this.verifyIdentityCodeTextBox = page.getByTestId("identity-code-textbox");
        this.identityContinueButton = page.getByTestId("identity-continue-button");
    };

    async login(loginAccount) {
        await this.emailTextbox.fill(loginAccount.email);
        await this.passwordTextbox.fill(loginAccount.password);
        await this.continueButton.click();
        await this.verifyIdentityCodeTextBox.fill(loginAccount.passCode);
        await this.identityContinueButton.click();
    };
};