/// <reference types="Cypress" />
import { Given,When,Then } from "cypress-cucumber-preprocessor/steps"; 
let fixtures;
let clients;

before(() => {
    cy.fixture('clients.json').then((clientsData) => {
        clients = clientsData;
    });

    cy.fixture('customerList.json').then((customerList) => {
        fixtures = customerList;
    });
});

//Scenario: The user can select the option to view other customer details
Given("the user navigates to the INSHUR test website", function(){
    visitMainPage();
});

When("the user selects the option to view details of a customer from the customer list page", function(){
    selectCustomersDetails(clients.client_1);
});

Then("the user is navigated to the customer details page of the user", function(){
    viewCustomerDetailsPage(clients.client_1);
});


//Below are a list of functions containing logic for the steps of the scenarios above:

// This function will navigate the user to the landing page and assert it by confirming that the logo and header elements are visible.
// The URL for the landing page has been added to the cypress.json config as baseURL. This is to allow for flexibility and clean code practice as will make it easier to update in one place.
function visitMainPage(){
    cy.visit('/').contains("Cypress Test"),
    cy.get(fixtures.inshurLogo).should("be.visible");
    cy.get(fixtures.customer_List_header).should("be.visible");
}


//This function will view the selected customer and assert that the correct name and their customer details page is displayed.
function viewCustomerDetailsPage(client){
    cy.get(fixtures.selected_customer).should("be.visible");
    cy.get(fixtures.customer_name_header).contains(client.name);
    cy.get(fixtures.customer_details).should("be.visible");
}

// This function selects a customer from the panel, based on the client.id provided, and will select the view details button so that the user gets forwarded to the correct details page.
// clientId had to be converted to a number so that cypress can construct the selector for the panel and button correctly.
function selectCustomersDetails(client){
    const clientId = Number(client.id);
    cy.get(`[data-test^="${fixtures.panel_customerName}${clientId}"]`).should("be.visible");
    cy.get(`[data-test^="${fixtures.view_details_button}${clientId}"]`).should("be.visible").click();
}