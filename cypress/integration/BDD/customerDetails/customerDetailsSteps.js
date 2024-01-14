/// <reference types="Cypress" />
import { Given,When,Then } from "cypress-cucumber-preprocessor/steps"; 
let fixtures;
let clients;

//issue was that i was using a promise.all block inside the before hook. After further investigation i found out that most cy. commands in cypress are already promise-like and therefroe dont need promise block.

before(() => {
    cy.fixture('clients.json').then((clientsData) => {
        clients = clientsData;
    });

    cy.fixture('customerList.json').then((customerList) => {
        fixtures = customerList;
    });
});

//Scenario: The user can see the customer details of a high value customer
Given("the user navigates to the INSHUR test website" ,function(){
    visitMainPage();
});

When("the user selects the option to view details of the first customer from the customer list page",function(){
    selectCustomersDetails(clients.client_1);
});

Then("the user is navigated to the customer details page of the high value customer",function(){
    viewCustomerDetailsPage(clients.client_1);
    viewCustomerAdditionalInfo("high Value Customer");
});

//Scenario: The user can see the organization of a Horsham based customer

When("the user selects the option to view details of the last customer from the customer list page",function(){
    selectCustomersDetails(clients.client_3);
});

Then("the user can see the name of the organziation of the Horsham based customer",function(){
    viewCustomerDetailsPage(clients.client_3);
    viewCustomerCity("Horsham");
    viewCustomerOrganization();
});

//Scenario: The user can see the job profile of a customer that rarely buys products

When("the user selects the option to view details of the second customer from the customer list page",function(){
    selectCustomersDetails(clients.client_2);
});

Then("the user can see the job profile of the customer that rarely buys products",function(){
    viewCustomerDetailsPage(clients.client_2);
    viewCustomerAdditionalInfo("Buys Products Rarely");
    viewCustomerJobProfile();
});

//Scenario: The user can see the contact info on the panel correctly matches the customer details

Then("the user can see the contact info on the panel correctly matches the customer details",function(){
    viewCustomersContactDetails(clients.client_1);
    comparePanelContactsWithDetails(clients.client_1);
});
//Scenario: The user is unable to see a clients purchase history on the customer details page

Then("the user is unable to see a clients purchase history on the customer details page",function(){
    viewCustomerDetailsPage(clients.client_1);
    verifyNoPurchaseHistory();
});


//Below are a list of functions containing logic for the steps of the scenarios above:

// This function will navigate the user to the landing page and assert it by confirming that the logo and header elements are visible.
// The URL for the landing page has been added to the cypress.json config as baseURL. This is to allow for flexibility and clean code practice as will make it easier to update in one place.
function visitMainPage(){
    cy.visit('/').contains("Cypress Test"),
    cy.get(fixtures.inshurLogo).should("be.visible");
    cy.get(fixtures.customer_List_header).should("be.visible");
}

// This function will view and assert a clients' contact details (email and phone) on the panel based on test data added to clients.json fixture file.
function viewCustomersContactDetails(client){
    cy.get(fixtures.panel_customers)
    .should('contain', client.contact_details.email)
    .and('contain', client.contact_details.phone);
}

// This function will compare the clients' contact details (email and phone) on the panel with the contact details in the clients' customer details page to ensure these are matching.
function comparePanelContactsWithDetails(client){
    cy.get(fixtures.panel_customer_contact_info)
    .should('contain', client.contact_details.email)
    .and('contain', client.contact_details.phone)
    .then(() => {
        cy.get(fixtures.customer_details_email)
        .should('contain', client.contact_details.email);
        cy.get(fixtures.customer_details_phone)
        .should('contain', client.contact_details.phone);
    })
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

    // Debug statements to log information
    // console.log('Client ID:', clientId);
    // console.log('panel_customerName Selector:', `[data-test^="${fixtures.panel_customerName}${clientId}"]`);
    // console.log('view_details_button Selector:', `[data-test^="${fixtures.view_details_button}${clientId}"]`);

    cy.get(`[data-test^="${fixtures.panel_customerName}${clientId}"]`).should("be.visible");
    cy.get(`[data-test^="${fixtures.view_details_button}${clientId}"]`).should("be.visible").click();
}

//The below functions containing 'view' are all assert functions to allow the user to assert correct elements in customer details section are visible. 
// Additional info and Customer city have text properties added to function to allow for more specific assertions in the scenarios.
function viewCustomerAdditionalInfo(text){
    cy.get(fixtures.customer_details_additional_info)
        .should('contain', text);
}

function viewCustomerCity(text){
    cy.get(fixtures.customer_details_city)
    .should('contain', text);
}

function viewCustomerOrganization(){
    cy.get(fixtures.customer_details_organization).should("be.visible");
}

function viewCustomerJobProfile(){
    cy.get(fixtures.customer_details_job_profile).should("be.visible");
}

// This function is an assertion to help confirm unhappy path test that purchase history fixture does not exist in customer details page.
function verifyNoPurchaseHistory(){
    cy.get(fixtures.customer_details_purchase_history).should('not.exist');
}