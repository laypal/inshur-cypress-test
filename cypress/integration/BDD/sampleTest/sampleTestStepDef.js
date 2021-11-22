/// <reference types="Cypress" />
import { Given,When,Then, And } from "cypress-cucumber-preprocessor/steps"; 

Given("the user visits Inshur Test Website", function(){ 
    cy.visit("http://localhost:3000").contains("Cypress Test");
})

When("they click the last user",()=>{
    cy.get("[data-test='3']").click();
})

Then("assert",()=>{
    cy.contains("Buys Lots of Products in general");
})
