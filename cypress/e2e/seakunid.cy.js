/// <reference types="cypress" />

import seakunPage from "../pages/seakun"

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("Testing Website Seakun id", () => {
  beforeEach(() => {
    cy.visit("https://www.seakun.id/");
    cy.viewport(1600, 900);
  });

  it("Make sure 27 products visible on the first load", () => {
    seakunPage.getProductLists().should("have.length", 27);
  });

  it("check search box apple dan show 4 product", () => {
    seakunPage.getSearchInput().type("apple{enter}");
    seakunPage.getProductLists().should("have.length", 4);

    // correction
    // we should make sure that the search result is correct
    // by checking the product name

    // this means we iterate over each product item and check if it contains the text "Apple"
    seakunPage.getProductLists().each(($el, index, $list) => {
      cy.wrap($el).contains("Apple");
    });
  });

  it("check filter kategori game", () => {
    seakunPage.getCategoryDropdown().click();
    cy.contains("Game").click();

    // correction
    // we should make sure the selected option is correct
    seakunPage.getCategoryDropdownText().should("have.text", "Game");
  });

  it("check dropdown filter tipe produk ready", () => {
    seakunPage.getTypeProductDropdown().click();
    cy.contains("Ready").click();

    //correction
    // we should make sure the selected option is correct
    seakunPage.getTypeProductDropdownText().should("have.text", "Ready");
  });

  it("check fitur search dan filter", () => {
    seakunPage.getSearchInput().type("tv{enter}");
    seakunPage.getCategoryDropdown().click();
    cy.contains("Entertainment").click();
    seakunPage.getTypeProductDropdown().click();
    cy.contains("Ready").click();
    seakunPage.getProductLists().should("contain", "Apple TV+");
  });

  it("Check FAQ", () => {
    // old code
    // cy.get(":nth-child(1) > .w-full > :nth-child(1) > #headingOne").click();

    // correction
    // instead of only checking one FAQ, we should check all of them
    seakunPage.getFaq().each(($el, index, $list) => {
      // it means we iterate over each FAQ item and click it
      cy.wrap($el).click();
      cy.wait(500);
    });
  });

  it("Test Menu Layanan", () => {
    seakunPage.getMenu().contains("Layanan").click();
    seakunPage.getLayanan().should("be.visible");
  });

  it("Test Menu Pengguna", () => {
    seakunPage.getMenu().contains("Pengguna").click();
    seakunPage.getPengguna().should("be.visible");
  });

  it("Test Menu cara pesan ", () => {
    seakunPage.getMenu().contains("Cara Pesan").click();
    seakunPage.getCaraPesan().should("be.visible");
    seakunPage.getCardCaraPesan().should("have.length", 5);
  });

  it("Test slide in carousel twitter", () => {
    seakunPage.getMenu().contains("Testimoni").click();
    seakunPage.getTestimony().should("be.visible").scrollIntoView().next();
    seakunPage.getTwitter().should("be.visible");
    seakunPage.getTwitter().then((el) => {
      if (Cypress.dom.isVisible(el)) {
        cy.wait(2000);
        seakunPage.getCursorSliderTwitter().click();
      } else {
        cy.wait(1000);
        cy.wrap(el).contains("Baca").should("be.visible");
      }
    });
  });

  it("Test pengguna seakun youtube", () => {
    seakunPage.getTabPengguna().contains("Youtube").click()
      .then((el) => {
        if (Cypress.dom.isVisible(el)) {
          seakunPage.getTabPenggunaActive().should("be.visible");
        } else {
          seakunPage.getTabPenggunaActive().should("not.be.visible");
        }
      });
  });

  it("Test pengguna seakun youtube full", () => {
    seakunPage.getTabPengguna().contains("Youtube").click();
    cy.wait(5000);
    seakunPage.getPengguna().contains("full").should("be.visible")
      .then((el) => {
        if (Cypress.dom.isVisible(el)) {
          seakunPage.getPengguna()
            .find("button[data-v-9e7fa756]")
            .contains("Pesan Sekarang")
            .should("be.disabled");
        } else {
          seakunPage.getPengguna()
            .find("button[data-v-9e7fa756]")
            .contains("Pesan Sekarang")
            .should("not.be.disabled");
        }
      });
  });

  // it("Test pengguna seakun Spotify full", () => {
  //   seakunPage.getTabPengguna().contains("Spotify").click();
  //   cy.wait(1000);
  //   seakunPage.getPengguna().contains("full").should("be.visible")
  //     .then((el) => {
  //       if (Cypress.dom.isVisible(el)) {
  //         seakunPage.getPengguna()
  //         .find("button[data-v-9e7fa756]")
  //         .contains("Pesan Sekarang")
  //         .should("be.disabled");
  //       } else {
  //         seakunPage.getPengguna()
  //         .find("button[data-v-9e7fa756]")
  //         .contains("Pesan Sekarang")
  //         .should("not.be.disabled");
  //       }
  //     });
  // });

  it("check order youtube", () => {
    seakunPage.getSearchInput().type("youtube{enter}");
    seakunPage.getProductLists().find("button[data-v-9e7fa756]").click();
    cy.contains("button", "Pilih").click();

    // correction
    // we should make sure the url after navigating to order page is correct
    cy.url().should("include", "/order?provider=youtube");

    cy.get("#menu-button > span");
    cy.wait(1000);
    seakunPage.getDropdownMasaBerlangganan().click();
    seakunPage.getPaymentList().contains("3 bulan ( Rp84.000 )").click();
    seakunPage.getDetailPayment().should("include.text", "Rp84.000");
  });

  it("Should able to view price schema for each product", () => {
    seakunPage.getProductLists()
      .should("have.length", 27)
      .contains("Lihat skema harga")
      .should("be.visible");

    // old code
    // cy.get("@product").eq(1).contains("Lihat skema harga").click();
    // cy.get(".modal-popup").contains("Skema Harga Spotify").should("be.visible");

    // instead of checking one product, we should check all of them
    seakunPage.getProductLists().each(($el, index, $list) => {
      // it means we iterate over each product item and click it
      cy.wrap($el).contains("Lihat skema harga").click();
      seakunPage.getModalPopup().should("be.visible");
      cy.get(".modal-popup svg").click();
      cy.wait(500);
    });
  });

  it("Should be able to navigate to sekeranjang product", () => {
    seakunPage.getProductSekeranjang().should("be.visible");
    seakunPage.getProductNonDigital().contains("Pesan").click();
    cy.url().should("include", "https://www.seakun.id/sekeranjang");
  });

  it("Make sure Sefitnes product button is disabled and button text is Segera Hadir", () => {
    cy.wait(1000);
    seakunPage.getProductSefitnes().find("button").should("be.disabled").contains("Segera hadir");
  });

  it("Make sure Seatap product button is disabled and button text is Segera Hadir", () => {
    cy.wait(1000);
    seakunPage.getProductSeatap().find("button").should("be.disabled").contains("Segera hadir");
  });

  it("Make sure Sekelas product button is disabled and button text is Segera Hadir", () => {
    cy.wait(1000);
    seakunPage.getProductSekelas().find("button").should("be.disabled").contains("Segera hadir");
  });

  it("Make sure Segame product button is disabled and button text is Segera Hadir", () => {
    cy.wait(1000);
    seakunPage.getProductSegame().find("button").should("be.disabled").contains("Segera hadir");
  });

  it("Make sure Sekatering product button is disabled and button text is Segera Hadir", () => {
    cy.wait(1000);
    seakunPage.getProductSekatering().find("button").should("be.disabled").contains("Segera hadir");
  });

  it("Make sure Sejalan product button is disabled and button text is Segera Hadir", () => {
    cy.wait(1000);
    seakunPage.getProductSejalan().find("button").should("be.disabled").contains("Segera hadir");
  });

  it("Make sure Ajukan Kerjasama, have /vote href destination", () => {
    seakunPage.getButtonKerjasama().click();
    cy.url().should("include", "https://www.seakun.id/vote");
  });

  it("Make sure Pengaduan Layanan floating button is visible", () => {
    seakunPage.getLayananPengaduan().should("be.visible");
  });

  //   it.only('Should be able to close the "Pengaduan Layanan" floating button', () => {
  //     cy.get(".btn-float > .relative > .tn:hidden").click();
  //     cy.get('a img[alt="seakun help"]').should("not.be.visible");
  //   });

  it("Should be able to make order, order Youtube product", () => {
    seakunPage.getProductLists().eq(0).as("youtubeProduct");
    cy.get("@youtubeProduct").contains("button", "Pesan").click();
    seakunPage.getModalPopup().contains("button", "Pilih").click();
    seakunPage.getDropdownMasaBerlangganan().click();
    seakunPage.getPaymentList().contains("3 bulan ( Rp84.000 )").click();
    seakunPage.getFormName().type("Anonim");
    seakunPage.getFormName().should("have.value", "Anonim");
    seakunPage.getFormEmail().type("anonim@gmail.com");
    seakunPage.getFormEmail().should("have.value", "anonim@gmail.com");
    seakunPage.getFormPhone().type("82123456789");
    seakunPage.getFormPhone().should("have.value", "82123456789");

    // correction
    // make sure the button is disabled before accepting the terms and conditions
    seakunPage.getButtonKonfirmasi().should("be.disabled");

    seakunPage.getCursor().click();

    //correction
    // make sure the button is not disabled after accepting the terms and conditions
    seakunPage.getButtonKonfirmasi().should("not.be.disabled");
  });
});
