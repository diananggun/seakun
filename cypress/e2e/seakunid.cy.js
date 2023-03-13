/// <reference types="cypress" />

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
    cy.get(".md\\:w-\\[268px\\]").should("have.length", 27);
  });

  it("check search box apple dan show 4 product", () => {
    cy.get("#search-input").type("apple{enter}");
    cy.get(".md\\:w-\\[268px\\]").as("productItems").should("have.length", 4);

    // correction
    // we should make sure that the search result is correct
    // by checking the product name

    // this means we iterate over each product item and check if it contains the text "Apple"
    cy.get("@productItems").each(($el, index, $list) => {
      cy.wrap($el).contains("Apple");
    });
  });

  it("check filter kategori game", () => {
    cy.get("#select-option-Game-game > #menu-button").click();
    cy.contains("Game").click();

    // correction
    // we should make sure the selected option is correct
    cy.get("#select-option-Game-game > #menu-button > :nth-child(1)").should("have.text", "Game");
  });

  it("check dropdown filter tipe produk ready", () => {
    cy.get("#select-option-Pre-order-2 > #menu-button").click();
    cy.contains("Ready").click();

    //correction
    // we should make sure the selected option is correct
    cy.get("#select-option-Pre-order-2 > #menu-button > :nth-child(1)").should("have.text", "Ready");
  });

  it("check fitur search dan filter", () => {
    cy.get("#search-input").type("tv{enter}");
    cy.get("#select-option-Game-game > #menu-button").click();
    cy.contains("Entertainment").click();
    cy.get("#select-option-Pre-order-2 > #menu-button").click();
    cy.contains("Ready").click();
    cy.get(".md\\:w-\\[268px\\]").should("contain", "Apple TV+");
  });

  it("Check FAQ", () => {
    // old code
    // cy.get(":nth-child(1) > .w-full > :nth-child(1) > #headingOne").click();

    // correction
    // instead of only checking one FAQ, we should check all of them
    cy.get(".w-full > :nth-child(1) > #headingOne").each(($el, index, $list) => {
      // it means we iterate over each FAQ item and click it
      cy.wrap($el).click();
      cy.wait(500);
    });
  });

  it("Test Menu Layanan", () => {
    cy.get(".cursor-pointer").contains("Layanan").click();
    cy.get("#provider > :nth-child(1)").should("be.visible");
  });

  it("Test Menu Pengguna", () => {
    cy.get(".cursor-pointer").contains("Pengguna").click();
    cy.get("#pengguna").should("be.visible");
  });

  it("Test Menu cara pesan ", () => {
    cy.get(".cursor-pointer").contains("Cara Pesan").click();
    cy.get("#orderFlow").should("be.visible");
    cy.get(".flex-wrap .mx-auto").should("have.length", 5);
  });

  it("Test slide in carousel twitter", () => {
    cy.get(".cursor-pointer").contains("Testimoni").click();
    cy.get("#testimony").should("be.visible").scrollIntoView().next();
    cy.get(".twitter-tweet").should("be.visible");
    cy.get(".twitter-tweet").then((el) => {
      if (Cypress.dom.isVisible(el)) {
        cy.wait(2000);
        cy.get("#testimony > .relative > .hidden >.cursor-pointer").click();
      } else {
        cy.wait(2000);
        cy.wrap(el).contains("Baca").should("be.visible");
      }
    });
  });

  it("Test pengguna seakun youtube", () => {
    cy.get("#container-pill")
      .contains("Youtube")
      .click()
      .then((el) => {
        if (Cypress.dom.isVisible(el)) {
          cy.get(".high-light").should("be.visible");
        } else {
          cy.get(".high-light").should("not.be.visible");
        }
      });
  });

  it("Test pengguna seakun youtube full", () => {
    cy.get("#container-pill").contains("Youtube").click();
    cy.wait(5000);
    cy.get("#pengguna")
      .contains("full")
      .should("be.visible")
      .then((el) => {
        if (Cypress.dom.isVisible(el)) {
          cy.get("#pengguna")
            .find("button[data-v-9e7fa756]")
            .contains("Pesan Sekarang")
            .should("not.be.disabled");
        } else {
          cy.get("#pengguna")
            .find("button[data-v-9e7fa756]")
            .contains("Pesan Sekarang")
            .should("be.disabled");
        }
      });
  });

  it("Test pengguna seakun Spotify full", () => {
    cy.get("#container-pill").contains("Spotify").click();
    cy.wait(5000);
    cy.get("#pengguna")
      .contains("full")
      .should("be.visible")
      .then((el) => {
        if (Cypress.dom.isVisible(el)) {
          cy.get("#pengguna").find("button[data-v-9e7fa756]").should("be.disabled");
        } else {
          cy.get("#pengguna")
            .find("button[data-v-9e7fa756]")
            .contains("Pesan Sekarang")
            .should("not.be.disabled");
        }
      });
  });

  it("check order youtube", () => {
    cy.get("#search-input").type("youtube{enter}");
    cy.get(".md\\:w-\\[268px\\]").find("button[data-v-9e7fa756]").click();
    cy.contains("button", "Pilih").click();

    // correction
    // we should make sure the url after navigating to order page is correct
    cy.url().should("include", "/order?provider=youtube");

    cy.get("#menu-button > span");
    cy.wait(1000);
    cy.get(".mt-4 > .rounded-xl > #menu-button").click();
    cy.get(".payment-list").contains("3 bulan ( Rp84.000 )").click();
    cy.get(".order-detail__payment > :nth-child(2)").should("include.text", "Rp84.000");
  });

  it("Should able to view price schema for each product", () => {
    cy.get(".md\\:w-\\[268px\\]")
      .as("product")
      .should("have.length", 27)
      .contains("Lihat skema harga")
      .should("be.visible");

    // old code
    // cy.get("@product").eq(1).contains("Lihat skema harga").click();
    // cy.get(".modal-popup").contains("Skema Harga Spotify").should("be.visible");

    // instead of checking one product, we should check all of them
    cy.get("@product").each(($el, index, $list) => {
      // it means we iterate over each product item and click it
      cy.wrap($el).contains("Lihat skema harga").click();
      cy.get(".modal-popup").should("be.visible");
      cy.get(".modal-popup svg").click();
      cy.wait(500);
    });
  });

  it("Should be able to navigate to sekeranjang product", () => {
    cy.get("div[data-v-5344746b][data-v-1f7f27ee]").as("productDigital");
    cy.get("@productDigital").contains("Sekeranjang").should("be.visible");
    cy.get("@productDigital").contains("Pesan").click();
    cy.url().should("include", "https://www.seakun.id/sekeranjang");
  });

  it("Make sure Sefitnes product button is disabled and button text is Segera Hadir", () => {
    cy.wait(1000);
    cy.get("div[data-v-5344746b][data-v-1f7f27ee]").as("productDigital");
    cy.get("@productDigital").eq(1).as("sefitnesProduct");

    cy.get("@sefitnesProduct").find("button").should("be.disabled").contains("Segera hadir");
  });

  it("Make sure Seatap product button is disabled and button text is Segera Hadir", () => {
    cy.wait(1000);
    cy.get("div[data-v-5344746b][data-v-1f7f27ee]").as("productDigital");
    cy.get("@productDigital").eq(2).as("seatapProduct");

    cy.get("@seatapProduct").find("button").should("be.disabled").contains("Segera hadir");
  });

  it("Make sure Sekelas product button is disabled and button text is Segera Hadir", () => {
    cy.wait(1000);
    cy.get("div[data-v-5344746b][data-v-1f7f27ee]").as("productDigital");
    cy.get("@productDigital").eq(3).as("sekelasProduct");

    cy.get("@sekelasProduct").find("button").should("be.disabled").contains("Segera hadir");
  });

  it("Make sure Segame product button is disabled and button text is Segera Hadir", () => {
    cy.wait(1000);
    cy.get("div[data-v-5344746b][data-v-1f7f27ee]").as("productDigital");
    cy.get("@productDigital").eq(4).as("segameProduct");

    cy.get("@segameProduct").find("button").should("be.disabled").contains("Segera hadir");
  });

  it("Make sure Sekatering product button is disabled and button text is Segera Hadir", () => {
    cy.wait(1000);
    cy.get("div[data-v-5344746b][data-v-1f7f27ee]").as("productDigital");
    cy.get("@productDigital").eq(5).as("sekateringProduct");

    cy.get("@sekateringProduct").find("button").should("be.disabled").contains("Segera hadir");
  });

  it("Make sure Sejalan product button is disabled and button text is Segera Hadir", () => {
    cy.wait(1000);
    cy.get("div[data-v-5344746b][data-v-1f7f27ee]").as("productDigital");
    cy.get("@productDigital").eq(6).as("sejalanProduct");

    cy.get("@sejalanProduct").find("button").should("be.disabled").contains("Segera hadir");
  });

  it("Make sure Ajukan Kerjasama, have /vote href destination", () => {
    cy.get("[data-v-1ce3c4b6]").find("button").contains("Ajukan Kerjasama").click();
    cy.url().should("include", "https://www.seakun.id/vote");
  });

  it("Make sure Pengaduan Layanan floating button is visible", () => {
    cy.get('a img[alt="seakun help"]').should("be.visible");
  });

  //   it.only('Should be able to close the "Pengaduan Layanan" floating button', () => {
  //     cy.get(".btn-float > .relative > .tn:hidden").click();
  //     cy.get('a img[alt="seakun help"]').should("not.be.visible");
  //   });

  it.only("Should be able to make order, order Youtube product", () => {
    cy.get(".md\\:w-\\[268px\\]").eq(0).as("youtubeProduct");
    cy.get("@youtubeProduct").contains("button", "Pesan").click();
    cy.get("div.modal-popup").contains("button", "Pilih").click();
    cy.get("#menu-button > span");
    cy.get(".mt-4 > .rounded-xl > #menu-button").click();
    cy.get(".payment-list").contains("3 bulan ( Rp84.000 )").click();
    cy.get(".form-content > #name").type("Anonim");
    cy.get(".form-content > #name").should("have.value", "Anonim");
    cy.get(".form-content > #email").type("anonim@gmail.com");
    cy.get(".form-content > #email").should("have.value", "anonim@gmail.com");
    cy.get(".form-content > #phone").type("82123456789");
    cy.get(".form-content > #phone").should("have.value", "82123456789");

    // correction
    // make sure the button is disabled before accepting the terms and conditions
    cy.get(".bg-green-seakun").should("be.disabled");

    cy.get("div.cursor-pointer").click();

    //correction
    // make sure the button is not disabled after accepting the terms and conditions
    cy.get(".bg-green-seakun").should("not.be.disabled");
  });
});
