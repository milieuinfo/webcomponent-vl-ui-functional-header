const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlFunctionalHeaderPage = require('./pages/vl-functional-header.page');

describe('vl-functional-header', async () => {
  let driver;
  let vlFunctionalHeaderPage;

  before(() => {
    driver = getDriver();
    vlFunctionalHeaderPage = new VlFunctionalHeaderPage(driver);
    return vlFunctionalHeaderPage.load();
  });

  it('WCAG', async () => {
    await assert.eventually.isFalse(vlFunctionalHeaderPage.hasWcagIssues());
  });

  it('als gebruiker kan ik de titel en sub titel van de functionele header zien', async () => {
    const functionalHeader = await vlFunctionalHeaderPage.getFunctionalHeader();
    const title = await functionalHeader.getTitle();
    const subTitle = await functionalHeader.getSubTitle();
    await assert.eventually.equal(title.getText(), 'SCHOOL- EN STUDIETOELAGEN');
    await assert.eventually.equal(subTitle.getText(), 'Voor lager, middelbaar en hoger onderwijs');
  });

  it('als gebruiker kan ik de titel en sub titel van de functionele header zien als ze als slot gedefinieerd werden', async () => {
    const functionalHeader = await vlFunctionalHeaderPage.getFunctionalHeaderSlots();
    const titleSlotNodes = await functionalHeader.getTitleSlotNodes();
    const subTitleSlotNodes = await functionalHeader.getSubTitleSlotNodes();
    await assert.eventually.equal(titleSlotNodes[0].getText(), 'SCHOOL- EN STUDIETOELAGEN');
    await assert.eventually.equal(subTitleSlotNodes[0].getText(), 'Voor lager, middelbaar en hoger onderwijs');
  });

  it('als gebruiker kan ik op de titel link klikken', async () => {
    const functionalHeader = await vlFunctionalHeaderPage.getFunctionalHeader();
    const title = await functionalHeader.getTitle();
    await assert.eventually.isTrue(vlFunctionalHeaderPage.isCurrentPage());
    await title.click();
    await assert.eventually.isFalse(vlFunctionalHeaderPage.isCurrentPage());
    const url = await driver.getCurrentUrl();
    assert.isTrue(url.endsWith('/demo/vl-functional-header.html?no-header=true&no-footer=true#'));
  });

  it('als gebruiker kan ik op een actie klikken', async () => {
    const functionalHeader = await vlFunctionalHeaderPage.getFunctionalHeaderActionsSlot();
    const actions = await functionalHeader.getActionNodes();
    await actions[0].click();
    const url = await driver.getCurrentUrl();
    assert.isTrue(url.endsWith('/demo/vl-functional-header.html?no-header=true&no-footer=true#'));
  });
});
