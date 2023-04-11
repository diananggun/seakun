/// <reference types="cypress" />

class shoppingPage {
    getCartQuantity() {
        return cy.get('[data-cy="cart-quantity"]')
    }

    getShoppingCart() {
        return cy.get('div.sc-1h98xa9-1.kQlqIC')
    }

    getTotalPayment() {
        return cy.get('.sc-1h98xa9-9')
    }

    getSizes() {
        return cy.get('span.checkmark')
    }

    getTotalProduct() {
        return cy.get('[data-cy="total-product"]')
    }

    getProductLists() {
        return cy.get('[data-cy=product-item]');
    }

    getCheckout() {
        return cy.get('.sc-1h98xa9-11')
    }

    getButtonAddCart() {
        return cy.get('button.sc-124al1g-0.jCsgpZ',{force: true})

    }
    

    getCartPageQuantity() {
        return cy.get('[data-cy="cart-page-quantity"]')
    }

    getProductCart() {
        return cy.get('.sc-7th5t8-0')
    }

    getDecrease() {
        return cy.get(':nth-child(1) > .sc-11uohgb-4 > div > [data-cy="decrease-quantity"]')
    }

    getIncrease() {
        return cy.get(':nth-child(1) > .sc-11uohgb-4 > div > [data-cy="increase-quantity"]')
    }

    getCartItemQuantity() {
        return cy.get('[data-cy="cart-item-quantity"]')
    }

}
  
export default new shoppingPage();
  