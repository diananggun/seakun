/// <reference types="cypress" />

import shoppingPage from "../pages/shopping";

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("Testing website shopping", () => {
  beforeEach(() => {
    cy.visit("https://react-shopping-automation-test.vercel.app");

    // correction, because the website is mobile first, we should set the viewport to mobile (600x900)
    // cy.viewport(600, 900);
    cy.viewport(1600, 900);
  });

  it("Should cart is empty at the beginning", () => {
    shoppingPage.getCartQuantity().should("contain", "0");
    shoppingPage.getCartQuantity().click()
    shoppingPage.getShoppingCart().should("contain", "Add some products in the cart");
    shoppingPage.getTotalPayment().should("contain", "$ 0.00");
  });

  it("Should have 7 types of size filter", () => {
    shoppingPage.getSizes().should("have.length", 7);
  })

  it("Should be able to select, select multiple size, and uncheck size filter", () => {
    shoppingPage.getSizes().each(($el, index, $list) => {
    cy.wrap($el)
    .should('have.css', 'background-color', 'rgb(236, 236, 236)')
    .click()
    .should('have.css', 'background-color', 'rgb(27, 26, 32)')
    });
  })

  it("should product total info match with total actual list", () => {
    shoppingPage.getTotalProduct().should("contain", "16");
    shoppingPage.getProductLists().should("have.length" ,16)
    shoppingPage.getSizes().eq(1).click()
    shoppingPage.getTotalProduct().should("contain", "2");
    shoppingPage.getProductLists().should("have.length" ,2)
    shoppingPage.getSizes().eq(4).click()
    shoppingPage.getTotalProduct().should("contain", "12");
    shoppingPage.getProductLists().should("have.length" ,12)
  })

  it("Should Add to cart button have yellow color when hovering the product item", () => {
    shoppingPage.getButtonAddCart().each(($el, index, $list) => {
    cy.wrap($el)
    .should('have.css', 'background-color', 'rgb(27, 26, 32)')
    .trigger('mouseover')
    .should('have.css', 'background-color', 'rgb(234, 191, 0)')
    });
  })

  it("Opening the checkout page at the beginning Should alert user that should add item to the cart", () => {
    shoppingPage.getCartQuantity().click()
    shoppingPage.getCheckout().click()
    cy.on('window:alert', (message) => {
      expect(message).to.equal('Add some product in the cart!')
    })
  })

  it("should be able to add product to the cart", () => {
    shoppingPage.getButtonAddCart().each(($el, index, $list) => {
      cy.wrap($el).click({force: true})
      cy.wait(500);
    })
    shoppingPage.getCartPageQuantity().should("contain", "16");
  })

  it("The cart total badge, should updated based on total items on the cart", ()=> {
    shoppingPage.getButtonAddCart().eq(1).click()
    shoppingPage.getIncrease().click()
    shoppingPage.getCartItemQuantity().should("contain", "2");
    shoppingPage.getCartPageQuantity().should("contain", "2");
  })

  it("should be able to increase and decrease item in the cart and do checkout", () => {
    shoppingPage.getButtonAddCart().eq(1).click()
    shoppingPage.getButtonAddCart().eq(0).click()
    shoppingPage.getIncrease().click()
    shoppingPage.getDecrease().click()
  })

  it("Should be able to checkout and show alert of total shopping price", () => {
    shoppingPage.getButtonAddCart().eq(0).click()
    shoppingPage.getTotalPayment().should("contain", "$ 10.90");
    shoppingPage.getCheckout().click()
    cy.on('window:alert', (message) => {
      expect(message).to.equal('Checkout - Subtotal: $ 10.90')
    })
  })

})  