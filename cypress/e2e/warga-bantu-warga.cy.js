/// <reference types="cypress" />

import wargaPage from "../pages/warga";

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("Testing website warga bantu warga", () => {
  beforeEach(() => {
    cy.visit("https://www.wargabantuwarga.com/");

    // correction, because the website is mobile first, we should set the viewport to mobile (600x900)
    cy.viewport(600, 900);
  });

  it("When clicking Telusuri Sekarang should navigate to the provices page", () => {
    wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click();
    // correction, no need to include the full URL, just check if the URL contains the path
    cy.url().should("include", "/provinces");
  });

  it("When clicking Kontak Darurat should navigate to the kontak darurat page", () => {
    wargaPage.getKontakDarurat().contains("Kontak Darurat").click();
    // correction, no need to include the full URL, just check if the URL contains the path
    cy.url().should("include", "/kontak-darurat");
  });

  it("Should provinces page show 31 provinces card", () => {
    wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click();
    // correction, no need to include the full URL, just check if the URL contains the path
    cy.url().should("include", "/provinces");
    wargaPage.getCardProvinces().should("have.length", 31);
  });

  it("Should be able to search provinces data", () => {
    wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click();
    cy.url().should("include", "https://www.wargabantuwarga.com/provinces");
    // dont forget to add the {enter} to trigger the search immediately, because the UI is delayed
    wargaPage.getSearch().type("Lampung{enter}").should("have.value", "Lampung");

    // old code
    // wargaPage.getCardProvinces().contains("Lampung").should("be.visible");

    // correction
    // we should iterate the search result, and check if the province name contains the search keyword
    wargaPage.getCardProvinces().each(($el, index, $list) => {
      cy.wrap($el).contains("Lampung");
    });

    // we should check the case sensitive/insensitive search  (Lampung vs lampung)
    // please implement here by yourself

    // we should check the search of portion of the keyword (jawa)
    // example if we search jawa, the search result should be jawa timur, jawa barat, jawa tengah (total 3 provinces)
    // please implement here by yourself

    // we should check the search result when the search keyword is not found
    // please implement here by yourself
  });

  it("On DKI Jakarta, should be able to filter by category", () => {
    wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click();
    // correction, no need to include the full URL, just check if the URL contains the path
    cy.url().should("include", "/provinces");

    // old code
    // wargaPage.getSearch().type("DKI Jakarta{enter}");
    // wargaPage.getSearch().should("have.value", "DKI Jakarta");
    // wargaPage.getCardProvinces().contains("DKI Jakarta").should("be.visible").click();

    // instead of navigating to the provinces page, we can directly navigate to the DKI Jakarta page
    cy.visit("https://www.wargabantuwarga.com/provinces/dki-jakarta");

    wargaPage.getCategoryDropdown().select("Oksigen");
    // after selecting the category, we should make sure the result is correct
    // you can use the item tag on every list item, to make sure the result is correct
    // please implement here by yourself

    wargaPage.getCategoryDropdown().select("Puskesmas");
    // after selecting the category, we should make sure the result is correct
    // you can use the item tag on every list item, to make sure the result is correct
    // please implement here by yourself
  });

  it("On DKI Jakarta, should able to filter by location", () => {
    wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click();
    // correction, no need to include the full URL, just check if the URL contains the path
    cy.url().should("include", "/provinces");

    // old code
    // wargaPage.getSearch().type("DKI Jakarta{enter}");
    // wargaPage.getSearch().should("have.value", "DKI Jakarta");
    // wargaPage.getCardProvinces().contains("DKI Jakarta").should("be.visible").click();

    // instead of navigating to the provinces page, we can directly navigate to the DKI Jakarta page
    cy.visit("https://www.wargabantuwarga.com/provinces/dki-jakarta");

    wargaPage.getLocationDropdown().select("Jakarta Timur");
    wargaPage.getDetailContents().find("li").should("contain", "Jakarta Timur");
  });

  it("On DKI Jakarta, should be able to search and search result is correct", () => {
    wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click();
    cy.url().should("include", "https://www.wargabantuwarga.com/provinces");

    // old code
    // wargaPage.getSearch().type("DKI Jakarta{enter}");
    // wargaPage.getSearch().should("have.value", "DKI Jakarta");
    // wargaPage.getCardProvinces().contains("DKI Jakarta").should("be.visible").click();

    // instead of navigating to the provinces page, we can directly navigate to the DKI Jakarta page
    cy.visit("https://www.wargabantuwarga.com/provinces/dki-jakarta");

    wargaPage.getSearch().type("Warteg AW");
    cy.wait(1000);

    wargaPage.getSearch().should("have.value", "Warteg AW");
    wargaPage.getButtonCari().click();

    cy.wait(300);
    // we should iterate the search result, and check if the search result name contains the search keyword
    wargaPage.getDetailContents().each(($el, index, $list) => {
      cy.wrap($el).contains("Warteg AW");
    });
  });

  it("On FAQ page, should be able to filter by question category", () => {
    wargaPage.getFAQ().click();
    cy.url().should("include", "https://www.wargabantuwarga.com/faq");
    wargaPage.getCategoryFAQ().select("PCR");

    wargaPage.getBoxFAQ().should("contain", "PCR");
  });

  it("On FAQ page, should be able to search the question", () => {
    wargaPage.getFAQ().click();
    cy.url().should("include", "/faq");

    wargaPage.getSearch().type("isolasi");
    wargaPage.getButtonCari().click();

    wargaPage.getResultFAQ().should("contain", "isolasi");
  });

  it("When click Selengkapnya on donasi section should navigate to donasi page", () => {
    wargaPage.getDonasi().click();
    cy.url().should("include", "/donasi");
  });

  it("On Donasi page, Should show 8 donasi card items", () => {
    wargaPage.getDonasi().click();
    cy.url().should("include", "/donasi");
    wargaPage.getCardDonasi().should("have.length", 8);
  });

  it("On Donasi page, Should donasi sekarang button contains href to kitabisa.com", () => {
    wargaPage.getDonasi().click();
    cy.url().should("include", "/donasi");

    // old code
    // wargaPage.getCardDonasi().eq(0).contains("Donasi Sekarang").click();
    // cy.url().should("eq", "https://kitabisa.com/campaign/daruratcovid2021");

    // correction
    // cypress cannot check the different domain, so we can check if the href contains the correct URL
    wargaPage
      .getCardDonasi()
      .eq(0)
      .find("a")
      .should("have.attr", "href", "https://kitabisa.com/campaign/daruratcovid2021");
  });

  it.only("On Service item, should be able to copy the phone number if phone number", () => {
    // wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click();
    // cy.url().should("include", "/provinces");
    // wargaPage.getSearch().type("DKI Jakarta");
    // wargaPage.getSearch().should("have.value", "DKI Jakarta");
    // wargaPage.getCardProvinces().contains("DKI Jakarta").click();

    // instead of navigating to the provinces page, we can directly navigate to the DKI Jakarta page
    cy.visit("https://www.wargabantuwarga.com/provinces/dki-jakarta");
    wargaPage.getCopyPhone().click();

    cy.assertValueCopiedToClipboard("085820016009");
  });

  it("On Service item, should be able to copy the address", () => {
    wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click();
    cy.url().should("include", "/provinces");
    wargaPage.getCardProvinces().eq(1).click();
    cy.wait(3000);
    wargaPage.getCopyAddress().click();

    cy.assertValueCopiedToClipboard("Hotel Hijrah Inn, Kota Banda Aceh");
  });
});
