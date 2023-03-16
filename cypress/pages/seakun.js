/// <reference types="cypress" />

class seakunPage {
  getProductLists() {
    return cy.get(".md\\:w-\\[268px\\]");
  }

  getSearchInput() {
    return cy.get("#search-input");
  }

  getCategoryDropdown() {
    return cy.get("#select-option-Game-game > #menu-button");
  }

  getCategoryDropdownText() {
    return cy.get("#select-option-Game-game > #menu-button > :nth-child(1)");
  }

  getTypeProductDropdown() {
    return cy.get("#select-option-Pre-order-2 > #menu-button");
  }

  getTypeProductDropdownText() {
    return cy.get("#select-option-Pre-order-2 > #menu-button > :nth-child(1)");
  }

  getFaq() {
    return cy.get(".w-full > :nth-child(1) > #headingOne");
  }

  getMenu() {
    return cy.get(".cursor-pointer");
  }

  getLayanan() {
    return cy.get("#provider > :nth-child(1)");
  }

  getPengguna() {
    return cy.get("#pengguna");
  }

  getCaraPesan() {
    return cy.get("#orderFlow");
  }

  getCardCaraPesan() {
    return cy.get(".flex-wrap .mx-auto");
  }

  getTestimony() {
    return cy.get("#testimony");
  }

  getTwitter() {
    return cy.get(".twitter-tweet");
  }

  getCursorSliderTwitter() {
    return cy.get("#testimony > .relative > .hidden >.cursor-pointer");
  }

  getTabPengguna() {
    return cy.get("#container-pill");
  }

  getTabPenggunaActive() {
    return cy.get(".high-light");
  }

  getModalPopup() {
    return cy.get(".modal-popup");
  }

  getProductNonDigital() {
    return cy.get("div[data-v-5344746b][data-v-1f7f27ee]");
  }
  getProductSekeranjang() {
    return cy.get("div[data-v-5344746b][data-v-1f7f27ee]").contains("Sekeranjang");
  }

  getProductSefitnes() {
    return cy.get("div[data-v-5344746b][data-v-1f7f27ee]").eq(1);
  }

  getProductSeatap() {
    return cy.get("div[data-v-5344746b][data-v-1f7f27ee]").eq(2);
  }

  getProductSekelas() {
    return cy.get("div[data-v-5344746b][data-v-1f7f27ee]").eq(3);
  }

  getProductSegame() {
    return cy.get("div[data-v-5344746b][data-v-1f7f27ee]").eq(4);
  }

  getProductSekatering() {
    return cy.get("div[data-v-5344746b][data-v-1f7f27ee]").eq(5);
  }

  getProductSejalan() {
    return cy.get("div[data-v-5344746b][data-v-1f7f27ee]").eq(6);
  }

  getButtonKerjasama() {
    return cy.get("[data-v-1ce3c4b6]").find("button").contains("Ajukan Kerjasama");
  }

  getLayananPengaduan() {
    return cy.get('a img[alt="seakun help"]');
  }

  getDropdownMasaBerlangganan() {
    return cy.get(".mt-4 > .rounded-xl > #menu-button");
  }

  getPaymentList() {
    return cy.get(".payment-list");
  }

  getDetailPayment() {
    return cy.get(".order-detail__payment > :nth-child(2)");
  }

  getFormName() {
    return cy.get(".form-content > #name");
  }

  getFormEmail() {
    return cy.get(".form-content > #email");
  }

  getFormPhone() {
    return cy.get(".form-content > #phone");
  }

  getButtonKonfirmasi() {
    return cy.get(".bg-green-seakun");
  }

  getCursor() {
    return cy.get("div.cursor-pointer");
  }

  fillOrderForm(name, email, phone) {
    this.getFormName().type(name);
    this.getFormName().should("have.value", name);

    this.getFormEmail().type(email);
    this.getFormEmail().should("have.value", email);

    this.getFormPhone().type(phone);
    this.getFormPhone().should("have.value", phone);
  }
}

export default new seakunPage();
