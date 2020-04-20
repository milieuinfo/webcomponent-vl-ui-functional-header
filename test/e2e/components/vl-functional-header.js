const { VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;
const { VlLink } = require('vl-ui-link').Test.VlLink;

class VlFunctionalHeader extends VlElement {
    async getTitle() {
        const element = await this.shadowRoot.findElement(By.css('#title'));
        return new VlElement(this.driver, element);
    }

    async getSubTitle() {
        const element = await this.shadowRoot.findElement(By.css('#sub-title'));
        return new VlElement(this.driver, element);
    }

    async getTitleSlotNodes() {
        const slot = await this.shadowRoot.findElement(By.css('slot[name="title"]'));
        return this.getAssignedNodes(slot);
    }

    async getSubTitleSlotNodes() {
        const slot = await this.shadowRoot.findElement(By.css('slot[name="sub-title"]'));
        return this.getAssignedNodes(slot);
    }

    async back() {
        const element = await this.shadowRoot.findElement(By.css('#back-link'));
        const link = await new VlLink(this.driver, element);
        return link.click();
    }
}

module.exports = VlFunctionalHeader;
