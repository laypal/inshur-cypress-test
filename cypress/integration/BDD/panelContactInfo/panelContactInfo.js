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

//Below are a list of functions containing logic for the steps of the scenarios above

function visitMainPage(){
    cy.visit("http://localhost:3000").contains("Cypress Test"),
    cy.get(fixtures.inshurLogo).should("be.visible");
    cy.get(fixtures.customer_List_header).should("be.visible");
}

function viewCustomersPanel(){
    cy.get(fixtures.panel_customers).should("be.visible");
}

function viewCustomersContactDetails(client){
    cy.get(`[data-test="${fixtures.panel_customer_contact_info}${client.id}"]`).should("be.visible");
}

function viewCustomersEmail(clients){
    cy.get(fixtures.panel_contact_email).contains(clients.client);
}

function viewCustomersPhone(clients){
    cy.get(fixtures.panel_contact_phone).contains(clients.client);
}