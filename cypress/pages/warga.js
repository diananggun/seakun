/// <reference types="cypress" />

class wargaPage {
  getButtonTelusuri() {
    return cy.get(".px-4.text-center > .flex");
  }

  getKontakDarurat() {
    return cy.get(":nth-child(2) > .w-full > :nth-child(1) > :nth-child(2)");
  }

  getKontakDarurat() {
    return cy.get(":nth-child(2) > .w-full > :nth-child(1) > :nth-child(2)");
  }

  // if the elements is more than one, we should use plural, so we know that it's an array
  getCardProvinces() {
    return cy.get(".justify-between > .flex-1");
  }

  getSearch() {
    return cy.get("#keywordsInput");
  }

  getCategoryDropdown() {
    return cy.get("#filter-kebutuhan");
  }

  getLocationDropdown() {
    return cy.get("#filter-lokasi");
  }

  getDetailContents() {
    return cy.get("ul.divide-y.divide-gray-200");
  }

  getButtonCari() {
    return cy.get(".mt-0 > .flex");
  }

  getFAQ() {
    return cy.get(":nth-child(3) > .inline-flex");
  }

  getCategoryFAQ() {
    return cy.get("#filter-kategori_pertanyaan");
  }

  getBoxFAQ() {
    return cy.get(".p-4");
  }

  getResultFAQ() {
    return cy.get("div.space-y-4 > :nth-child(1)");
  }

  getDonasi() {
    return cy.get(".text-brand");
  }

  getCardDonasi() {
    return cy.get(".flex.flex-col.shadow-md.rounded-md.overflow-hidden.max-w-xs");
  }

  getCopyPhone() {
    return cy.get(":nth-child(5) > .px-4 > .w-full > .items-start > .inline-flex");
  }

  getCopyAddress() {
    return cy.get(":nth-child(5) > .px-4 > :nth-child(4) > .flex-col > :nth-child(1) > .inline-flex");
  }
}

export default new wargaPage();
