/// <reference types="Cypress" />
import { Given,When,Then } from "cypress-cucumber-preprocessor/steps"; 
let fixtures;
let clients;

before(() => {
    Promise.all([
        cy.fixture('clients.json'),
        cy.fixture('customerList.json')
    ]).then(([clientsData,customerList]) => {
        clients = clientsData;
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


//Below are a list of functions containing logic for the steps of the scenarios above

function visitMainPage(){
    cy.visit("http://localhost:3000").contains("Cypress Test"),
    cy.get(fixtures.inshurLogo).should("be.visible");
    cy.get(fixtures.customer_List_header).should("be.visible");
}

function viewCustomerDetailsPage(clients){
    cy.get(fixtures.customerList,selected_customer).should("be.visible");
    cy.get(fixtures.customer_name_header).contains(clients.client);
    cy.get(fixtures.customer_details).should("be.visible");
}

function selectCustomersDetails(client){
    cy.get(`[data-test="${fixtures.panel_customerName}${client.id}"]`).should("be.visible");
    cy.get(`[data-test="${fixtures.viewClients_button}${client.id}"]`).click();
}