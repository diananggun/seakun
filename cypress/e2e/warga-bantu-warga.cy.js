/// <reference types="cypress" />

import wargaPage from "../pages/warga"

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

describe("Testing website warga bantu warga" , () => {
    beforeEach(() => {
        cy.visit("https://www.wargabantuwarga.com/");
        cy.viewport(1600, 900);
      });

    it("When clicking Telusuri Sekarang should navigate to the provices page" ,() =>{
        wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/provinces")
    })

    it("When clicking Kontak Darurat should navigate to the kontak darurat page" ,() =>{
        wargaPage.getKontakDarurat().contains("Kontak Darurat").click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/kontak-darurat")
    })

    it("Should provinces page show 31 provinces card" ,() =>{
        wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/provinces")
        wargaPage.getCardProvince().should("have.length" , 31)
    })

    it("Should be able to search provinces data" ,() =>{
        wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/provinces")
        wargaPage.getSearch().type("Lampung")
        wargaPage.getSearch().should("have.value","Lampung")
        wargaPage.getCardProvince().contains("Lampung").should("be.visible")
    })

    it("On DKI Jakarta, should be able to filter by category" ,() =>{
        wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/provinces")
        wargaPage.getSearch().type("DKI Jakarta")
        wargaPage.getSearch().should("have.value","DKI Jakarta")
        wargaPage.getCardProvince().contains("DKI Jakarta").should("be.visible").click()
        wargaPage.getCategoryDropdown().select("Oksigen")
    })

    it("On DKI Jakarta, should able to filter by location" ,() =>{
        wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/provinces")
        wargaPage.getSearch().type("DKI Jakarta")
        wargaPage.getSearch().should("have.value","DKI Jakarta")
        wargaPage.getCardProvince().contains("DKI Jakarta").should("be.visible").click()
        wargaPage.getLocationDropdown().select("Jakarta Timur")
        wargaPage.getDetailContent().find('li').should("contain", "Jakarta Timur")
    })

    it("On DKI Jakarta, should be able to search and search result is correct" ,() =>{
        wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/provinces")
        wargaPage.getSearch().type("DKI Jakarta")
        wargaPage.getSearch().should("have.value","DKI Jakarta")
        wargaPage.getCardProvince().contains("DKI Jakarta").click()
        cy.wait(1000)
        wargaPage.getSearch().type("Warteg AW")
        cy.wait(1000)
        wargaPage.getSearch().should("have.value","Warteg AW")
        wargaPage.getButtonCari().click()
        cy.wait(300)
        wargaPage.getDetailContent().find('li').should("contain", "Warteg AW")
    })
    
    it("On FAQ page, should be able to filter by question category" ,() =>{
        wargaPage.getFAQ().click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/faq")
        wargaPage.getCategoryFAQ().select("PCR")
        wargaPage.getBoxFAQ().should("contain" , "PCR")
    })

    it("On FAQ page, should be able to search the question" ,() =>{
        wargaPage.getFAQ().click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/faq")
        wargaPage.getSearch().type("isolasi")
        wargaPage.getButtonCari().click()
        wargaPage.getResultFAQ().should("contain" , "isolasi")
    })

    it("When click Selengkapnya on donasi section should navigate to donasi page" ,() =>{
        wargaPage.getDonasi().click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/donasi")
    })

    it("On Donasi page, Should show 8 donasi card items" ,() =>{
        wargaPage.getDonasi().click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/donasi")
        wargaPage.getCardDonasi().should("have.length",8)
    })

    it("On Donasi page, Should donasi sekarang button contains href to kitabisa.com" ,() =>{
        wargaPage.getDonasi().click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/donasi")

        wargaPage.getCardDonasi().eq(0).contains("Donasi Sekarang").click()
        cy.url().should("eq" ,"https://kitabisa.com/campaign/daruratcovid2021")
    })

    it("On Service item, should be able to copy the phone number if phone number" ,() =>{
        wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/provinces")
        wargaPage.getSearch().type("DKI Jakarta")
        wargaPage.getSearch().should("have.value","DKI Jakarta")
        wargaPage.getCardProvince().contains("DKI Jakarta").click()
        cy.wait(300)
        wargaPage.getCopyPhone().click()

        cy.assertValueCopiedToClipboard("085820016009")
    })

    it("On Service item, should be able to copy the address" ,() =>{
        wargaPage.getButtonTelusuri().contains("Telusuri sekarang").click()
        cy.url().should("include" ,"https://www.wargabantuwarga.com/provinces")
        wargaPage.getCardProvince().eq(1).click()
        cy.wait(3000)
        wargaPage.getCopyAddress().click()

        cy.assertValueCopiedToClipboard("Hotel Hijrah Inn, Kota Banda Aceh")

        
    })
    
})