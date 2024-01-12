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
    unhappyViewPurchaseHistory();
});


//Below are a list of functions containing logic for the steps of the scenarios above

function visitMainPage(){
    cy.visit("http://localhost:3000").contains("Cypress Test"),
    cy.get(fixtures.inshurLogo).should("be.visible");
    cy.get(fixtures.customer_List_header).should("be.visible");
}

function viewCustomersContactDetails(clients){
    cy.get(fixtures.panel_customer_contact_info).contains(clients.client);
}

function comparePanelContactsWithDetails(clients){
    cy.get(fixtures.panel_customer_contact_info).contains(clients.client)
    .then(($contact_info) => {
        const contact_info = $contact_info.text();
        cy.get(fixtures.customer_details).matches(contact_info);
    })
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

function viewCustomerAdditionalInfo(text, value){
    cy.get(fixtures.customer_details_additional_info)
        .should('contain', text)
        .and('contain', value);
}

function viewCustomerCity(text){
    cy.get(fixtures.customer_details_city)
    .should('contain', text)
    .and ('contain', value);
}

function viewCustomerOrganization(){
    cy.get(fixtures.customer_details_organization).should("be.visible");
}

function viewCustomerJobProfile(){
    cy.get(fixtures.customer_details_job-profile).should("be.visible");
}

function unhappyViewPurchaseHistory(){
    cy.get(fixtures.customer_details_purchase-history).should('not.exist');
}