const { expect } = require('@playwright/test');
import { BasePage } from './base_page';


exports.StudioLayerSceneSettingsPage = class StudioLayerSceneSettingsPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.layerMenuIcon = page.getByTestId("layer-menu-icon");
        this.layerSettingsButton = page.getByTestId("layers-settings");
        this.hideLayerIcon = page.getByTestId("hide-layer-icon");
        this.layerName = page.getByTestId("layer-name");
        this.layerThreeDotMenuButton = page.getByTestId("layer-three-dots-menu");
        this.renameLayerButton = page.getByTestId("rename-layer-button");
        this.renameLayerTextBox = page.getByTestId("rename-layer-textbox");
        this.saveRenameLayerButton = page.getByTestId("save-rename-layer-textbox");
        this.duplicateLayerButton = page.getByTestId("duplicate-layer-button");
        this.copyToButton = page.getByTestId("copy-layer-button");
        this.sceneListDropdown = page.getByTestId("scene-select-dropdown");
        this.confirmCopyButton = page.getByTestId("confirm-copy-button");
        this.deleteLayerButton = page.getByTestId("delete-layer-button");
        this.confirmDeletelayerButton = page.getByTestId("confirm-delete-layer-button");
        this.eyeIcon = page.getByTestId("hide-layer-icon");
        this.sceneSettingsButton = page.getByTestId("scene-settings");
        this.sceneName = page.getByTestId("scene-name");
        this.sceneThreeDotMenuButton = page.getByTestId("scene-three-dots-menu");
        this.renameSceneButton = page.getByTestId("rename-scene-button");
        this.renameSceneTextBox = page.getByTestId("rename-scene-textbox");
        this.saveRenameSceneButton = page.getByTestId("save-rename-scene-button");
        this.duplicateSceneButton = page.getByTestId("duplicate-scene-button");
        this.deleteSceneButton = page.getByTestId("delete-scene-button");  
        this.confirmDeleteSceneButton = page.getByTestId("confirm-delete-scene-button");
        this.sceneBgColorButton = page.getByTestId("scene-background-color");
        this.hexColorTextbox = page.getByTestId("color-picker-hex");
        this.removeBgColorButton = page.getByTestId("remove-background-color");
        this.sceneBgImageButton = page.getByTestId("scene-background-image");
        this.uploadImageInput = page.getByTestId("image-upload-input");
        this.sceneTitle = page.getByTestId("scene-title");
        this.addNewSceneButton = page.getByTestId("add-new-scene");
    };

    async clickToOpenSettingMenu(settingButton) {
        await this.layerMenuIcon.click();
        await settingButton.click();
        await expect(settingButton).toHaveAttribute("aria-expanded", "true");
    };
    
    async openThreeDotMenu(threeDotMenuButton) {
        await threeDotMenuButton.click();
        await expect(threeDotMenuButton).toHaveAttribute("aria-expanded", "true");
    };

    async editObjectName(renameButton, renameTextBox, newName, saveButton) {
        await renameButton.click();
        await renameTextBox.fill(newName);
        await saveButton.click();
    };

    async verifyName(elementName) {
        await expect(this.page.locator("//p[text()='" + elementName + "']")).toBeVisible();
    };

    async duplicateObject(element) {
        await element.click();
    };

    async deleteObject(element, confirmDeleteButton) {
        await element.click();
        await confirmDeleteButton.click();
    };

    async openLayerSettingMenu() {
        await this.clickToOpenSettingMenu(this.layerSettingsButton);
    };

    async openLayerThreeDotMenu() {
        await this.openThreeDotMenu(this.layerThreeDotMenuButton);
    };

    async editLayerName(elementName) {
        await this.editObjectName(this.renameLayerButton, this.renameLayerTextBox, elementName, this.saveRenameLayerButton);
    };

    async verifyLayerName(elementName) {
        await expect(this.layerName).toHaveText(elementName);
    };

    async duplicateLayer() {
        await this.duplicateObject(this.duplicateLayerButton);
    };

    async copyLayerToOtherScene(sceneName) {
        await this.copyToButton.click();
        await this.sceneListDropdown.selectOption(sceneName);
        await this.confirmCopyButton.click();
    };

    async verifyLayerCoppiedToOtherScene(sceneUUID, elementIframe) {
        await expect(this.page.frameLocator("//iframe[contains(@src,'" + sceneUUID + "')]").getByTestId(elementIframe)).toBeVisible({timeout: 10000});
    };

    async deleteLayer() {
        await this.deleteObject(this.deleteLayerButton, this.confirmDeletelayerButton);
    };

    async verifyLayerIsVisible(elementIframe) {
        await expect(this.page.frameLocator("#preview-iframe").getByTestId(elementIframe)).toBeVisible({timeout: 10000});
    };

    async verifyLayerIsNotVisible(elementIframe) {
        await expect(this.page.frameLocator("#preview-iframe").getByTestId(elementIframe)).toBeHidden({timeout: 10000});
    };

    async clickEyeIcon() {
        await this.eyeIcon.click();
    };

    async openSceneSettingMenu() {
        await this.clickToOpenSettingMenu(this.sceneSettingsButton);
    };
    
    async openSceneThreeDotMenu() {
        await this.openThreeDotMenu(this.sceneThreeDotMenuButton);
    };

    async editSceneName(sceneName) {
        await this.editObjectName(this.renameSceneButton, this.renameSceneTextBox, sceneName, this.saveRenameSceneButton);
    };

    async verifySceneName(sceneName) {
        await expect(this.page.locator("//div[@data-testid='scene-name']//p[contains(text(),'" + sceneName + "')]")).toBeVisible();
    };

    async duplicateScene() {
        await this.duplicateObject(this.duplicateSceneButton);
    };

    async deleteScene() {
        await this.deleteObject(this.deleteSceneButton, this.confirmDeleteSceneButton);
    };

    async verifySceneDeleted() {
        await expect(this.sceneTitle).toBeHidden();
    };

    async addSceneBackgroundColor(sceneInfo) {
        await this.sceneBgColorButton.click();
        await this.fillElementAndWait(this.hexColorTextbox, sceneInfo.sceneBackgroundColor);
    };

    async addSceneBackgroundImage(imageFilePath, bgImageName) {
        await this.sceneBgImageButton.click();
        await this.uploadImageInput.setInputFiles(imageFilePath + bgImageName);
        await expect(this.page.locator("//img[@alt='" + bgImageName + "']")).toBeVisible({timeout: 10000});
        await this.clickElementAndWait(this.page.locator("//img[@alt='" + bgImageName + "']"));
    };

    async addNewScene() {
        await this.addNewSceneButton.click();
    };

};

