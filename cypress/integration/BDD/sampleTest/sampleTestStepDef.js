/// <reference types="Cypress" />
import { Given,When,Then, And } from "cypress-cucumber-preprocessor/steps"; // have to import these, so that cypress can recognise cucumber keywords

Given("the user visits Inshur Test Website", function(){ // we can make an anonymus function as well here, use "()=>" instead of function() 
    cy.visit("http://localhost:3000").contains("Cypress Test")
})

When("the click the last user",()=>{
    cy.get("[data-test='3']").click() // to click on search option
})

Then("assert",()=>{
    cy.contains("Buys Lots of Products in general") // to assert that we succesfully move to the redirected url
})
