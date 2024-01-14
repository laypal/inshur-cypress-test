**Technical test for Senior QA role at INSHUR.**

Hello this is a ReadMe containing my rationale of the tests and work process for the technical test provided by INSHUR. I have created a set number of feature files, steps and fixtures and added new data-test elements to the CSS to allow for ease of testability.
Below I will provide further detail of my work processes and reasons behind tests as well as issues I encountered and how I approached and managed to resolve them.

**Work process**

**Integration**

To start off, I spent some time familiarising myself with the application after running it locally on my machine (using _yarn server_ and _yarn start_ commands). I then decided to create three sets of feature files to separate out user journey tests and not have them all together in one file.
The rationale behind that is mostly from past work experiences of wanting to keep files neat and in a readable format so that they can easily be understood when reviewed.

I have followed camelCase naming conventions for the feature and fixture files to stick with standard JavaScript conventions.

- _customerList.feature_
- _customerDetails.feature_
- _panelContactInfo.feature_

Each .feature file contains a user story and glossary with key terms used in the scenarios. This is a method I have found most useful to ensure the feature files and tests contain all necessary info available at a glance.

**BDD**

The scenarios have been written using declarative BDD writing styles (https://cucumber.io/docs/bdd/better-gherkin/) which intends to describe the behaviour of the application and the user journey. This is a method of writing BDD which I have adapted from my current workplace and have found it to be more efficient and resilient way of writing BDD compared to imperative writing styles.
One of the main advantages of using this, especially when working on a framework that will be growing in tests over time and may encounter various changes to the application depending on business needs, is the reduction of maintenance of tests. With this, any changes applied to the logic of the application will be handled in the step definition which contains the automation code that interacts with the application.

**Fixtures**

I created two new fixture files for my tests. One containing the relevant elements that I intend to call in my tests and another one containing the client data (i.e. id and names) that have been added in this application.

- _clients.json_
- _customerList.json_

The rationale behind creating _clients.json_ was to allow for reusability and consistent clean test purposes, so that I could reuse these client definitions across multiple tests without having to redefine them each time. Keeping the test data separate from test logic is also good practice to help make the tests easier to read and allows for scalability should I need to add more clients in the future. 
I have added following attributes to each client so that these can be called in the steps when needed: id, name, contact details - email, contact details - phone.

The _customerList.json_ fixture contains all relevant elements for the tests. I have added additional _data-test_ attributes to the elements as best practice standard for cypress (https://docs.cypress.io/guides/references/best-practices#Selecting-Elements) and because it allows for test stability and avoid brittle selectors.


Some elements have been added to _Customer.js_ by having a _customer.id_ appended to it i.e. _{`panel_customer_name${customer.id}`}_. This was done so that I could easily identify the element of a given client by referencing the fixture + client.client_1/2/3 data provided in the fixture file in my tests. This helps make the tests more stable by having a unique identifier and makes them more readable and easy to understand.

**stepDefinitions**

Following standard cypress automation practices, the _steps.js_ files have been organised and created under corresponding feature folders. This is to keep step definitions isolated in their own files and avoid conflicts as well as allow for modularity to make the tests easier to work on individual features without affecting others.

- _customerListSteps.js_
- _customerDetailsSteps.js_
- _panelContactInfoSteps.js_

Each step is organized in the files and grouped around commented out scenario titles for ease of readability.

I created functions that each perform a specific task with descriptive names, relevant to the tests as well as comments with descriptions of what each function does. These are being called in each step to make the tests easy to read, understand and maintain. The functions all live at the bottom of each of the steps files so they are separated and easy to read.

Using the fixtures _clients.json_ and _customerList.json_ for test data in each stepsFile helps separate test data from logic and makes it easieer to maintain and update.

I had to create a _before_ hook that loads both the _clients.json_ as well as _customerList.json_ fixture files before the tests would run to ensure that all test data has been loaded before and would therefore not fail the tests.
The URL for the landing page has been added to the cypress.json config as _baseURL_ to allow for it to be called in the steps using _cy.visit('/')._ this is for flexibility and clean code practice as it will make it easier to update this one place rather than having to amend hard-coded URL in every steps file.

There are a number of functions that take parameters to make them more flexible and allow for re-usability i.e. _selectCustomerDetails_


- This function selects a customer from the panel, based on the client.id provided, and will select the view details button so that the user gets forwarded to the correct details page.
- clientId had to be converted to a number so that cypress can construct the selector for the panel and button correctly.

_function selectCustomersDetails(client){
    const clientId = Number(client.id);
    cy.get(`[data-test^="${fixtures.panel_customerName}${clientId}"]`).should("be.visible");
    cy.get(`[data-test^="${fixtures.view_details_button}${clientId}"]`).should("be.visible").click();
}_



I had written out the fixtures with client.id parameters, as the elements in the _Customers.js_ file had _customer.id_ appended to them, which allowed me to have it written in such a way that when the function _selectCustomersDetails_ is being used in the test, it gave me the flexibility to specify and select which customer data I wanted the test to select.

i.e.

_When("the user selects the option to view details of the first customer from the customer list page",function(){
    selectCustomersDetails(clients.client_1);
});_

*clients.client_1 had been defined in the clients.json fixture with 'id' and 'name' attributes for each client.

*the fixtures for these had to be written so that it would only call the base of the selecters without the arribute syntax i.e. _"view_details_button: "view-details_button"_. This is because the function for this already contained the data-test attribute syntax when interacting with it.

I have also added a 'unhappy path' scenario to help test and assert non-existent functions. This was done as a proof to check that a given element does not exist in the UI and is good practice to verify the absence of an element.

**Issues encountered during test runs:**

- There were a few issues I encountered whilst working on the .js steps files which were mostly due to having been more accustomed to working with typescript on cypress but were quickly resolved due to similarities with both.

- It took me some time figuring out how to best write out the elements that had _client.id_ appended to them as I wasnt entirely familiar with correct style for this in CSS, but again this was resolved after few iterations and finding reference points online to help me with this.

- I encountered a number of issues whilst figuring out the best way of running my tests, which is how I came to the decision of using a before hook as there were multiple runs where my tests couldn't be run because of test data or fixtures not having loaded before each step.
- Initially I created a promise using a _before_ hook that uses _Promise.all_ to load multiple fixtures at once, I did this after reviewing best practice guidance as seen here: (https://docs.cypress.io/guides/references/best-practices#2-Run-shared-code-before-each-test).
- This was a consideration that needed to be taken as cypress runs asynchronously and I needed to make sure that the the relevant fixtures were being called before the scenarios were run.
- However, this resulted in the tests failing and the _clientList.js_ fixture not loading in the hook.
- After further investigation, I identified and found out that the promise.all block inside the before hook was causing the issue. This was because it was causing conflicting error as most cy. commands are already promise-like and don't need a promise block!

I debugged this using console.log() and cy.log() commands to help me identify where the issue was occuring in the tests exactly and then found further information online refering the use of before hooks without promise blocks.

- There were also some additional errors encountered during test runs with some of my functions, in particular _selectCustomersDetails_ and _comparePanelContactsWithDetails_. Which were fixed after debugging and investigation and identifying issues with the structure of the function in the compare function and requirements to add additional test data in the _clients.json_ file so that I could call client contact details to verify phone and email data.
- For the _selectCustomersDetails_ function I had to convert _clientID_ to a number so that cypress could construct the selector for the panel and button correctly.
