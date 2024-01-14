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

//Scenario: The user can see the customers contact details on the customerlist page
Given("the user navigates to the INSHUR test website",function(){
        visitMainPage();
});

When("the user views the customers on the panel",function(){
    viewCustomersPanel();
});

Then("the user can see the customers contact details on the customer list page",function(){
    viewCustomersContactDetails(clients.client_1, clients.client_2, clients.client_3);
});

//Scenario: The user sees the last customers email address

Then("the user can see the last customers email address",function(){
    viewCustomersEmail(clients.client_3);
});

//Scenario: The user sees the first customers phone number

Then("the user can see the first customers phone number",function(){
    viewCustomersPhone(clients.client_1);
});    

//Below are a list of functions containing logic for the steps of the scenarios above:

// This function will navigate the user to the landing page and assert it by confirming that the logo and header elements are visible.
// The URL for the landing page has been added to the cypress.json config as baseURL. This is to allow for flexibility and clean code practice as will make it easier to update in one place.
function visitMainPage(){
    cy.visit('/').contains("Cypress Test"),
    cy.get(fixtures.inshurLogo).should("be.visible");
    cy.get(fixtures.customer_List_header).should("be.visible");
}

// This function will assert that the panel with the customers details is visible.
function viewCustomersPanel(){
    cy.get(fixtures.panel_customers).should("be.visible");
}

// This function will view and assert a clients' contact details (email and phone) on the panel based on test data added to clients.json fixture file.
function viewCustomersContactDetails(client){
    cy.get(fixtures.panel_customers)
    .should('contain', client.contact_details.email)
    .and('contain', client.contact_details.phone);
}

// This function will assert the clients' contact email on the panel is correctly displayed based on test data added to clients.json fixture file.
function viewCustomersEmail(client){
    cy.get(fixtures.panel_contact_email).contains(client.contact_details.email);
}

// This function will assert the clients' contact phone number on the panel is correctly displayed based on test data added to clients.json fixture file.
function viewCustomersPhone(client){
    cy.get(fixtures.panel_contact_phone).contains(client.contact_details.phone);
}