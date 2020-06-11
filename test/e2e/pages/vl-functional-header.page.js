const VlFunctionalHeader = require('../components/vl-functional-header');
const {Page, Config} = require('vl-ui-core').Test;

class VlFunctionalHeaderPage extends Page {
  constructor(driver) {
    super(driver);
    this.URL = '/demo/vl-functional-header.html';
  }

  async getFunctionalHeader() {
    return this._getFunctionalHeader('#functional-header');
  }

  async getFunctionalHeaderSlots() {
    return this._getFunctionalHeader('#functional-header-slots');
  }

  async getFunctionalHeaderActionsSlot() {
    return this._getFunctionalHeader('#functional-header-actions-slot');
  }

  async load() {
    await super.load(Config.baseUrl + this.URL);
  }

  async isCurrentPage() {
    const url = await this.driver.getCurrentUrl();
    return url.endsWith(`${this.URL}?no-header=true&no-footer=true`);
  }

  async _getFunctionalHeader(selector) {
    return new VlFunctionalHeader(this.driver, selector);
  }
}

module.exports = VlFunctionalHeaderPage;
