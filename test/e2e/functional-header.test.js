const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlFunctionalHeaderPage = require('./pages/vl-functional-header.page');

describe('vl-functional-header', async () => {
    const vlFunctionalHeaderPage = new VlFunctionalHeaderPage(driver);

    before(() => {
        return vlFunctionalHeaderPage.load();
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
        const title = await functionalHeader.getTitle();
        const subTitle = await functionalHeader.getSubTitle();
        await assert.eventually.equal(title.getText(), 'SCHOOL- EN STUDIETOELAGEN');
        await assert.eventually.equal(subTitle.getText(), 'Voor lager, middelbaar en hoger onderwijs');
    });

    it('als gebruiker kan ik op de titel link klikken', async () => {
        const functionalHeader = await vlFunctionalHeaderPage.getFunctionalHeader();
        const title = await functionalHeader.getTitle();
        await assert.eventually.isTrue(vlFunctionalHeaderPage.isCurrentPage());
        await title.click();
        await assert.eventually.isFalse(vlFunctionalHeaderPage.isCurrentPage());
    });

    it('als gebruiker kan ik naar de vorige pagina gaan', async () => {
        const URL = 'https://webcomponenten.omgeving.vlaanderen.be';
        await driver.get(URL);
        await vlFunctionalHeaderPage.load();
        const functionalHeader = await vlFunctionalHeaderPage.getFunctionalHeader();
        await assert.eventually.isTrue(vlFunctionalHeaderPage.isCurrentPage());
        await functionalHeader.back();
        await assert.eventually.isFalse(vlFunctionalHeaderPage.isCurrentPage());
    });
});
