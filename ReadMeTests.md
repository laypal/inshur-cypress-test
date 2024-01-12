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

The _customerList.json_ fixture contains all relevant elements for the tests. I have added additional _data-test_ attributes to the elements as best practice standard for cypress (https://docs.cypress.io/guides/references/best-practices#Selecting-Elements) and because it allows for test stability and avoid brittle selectors.

Some elements have been added to _Customer.js_ by having a _customer.id_ appended to it i.e. _{`panel_customer_name${customer.id}`}_. This was done so that I could easily identify the element of a given client by referencing the fixture + clients.client data provided in the fixture file in my tests. This helps make the tests more stable by having a unique identifier, makes them more readable and easy to understand.

**stepDefinitions**

Following standard cypress automation practices, the _steps.js_ files have been organised and created under corresponding feature folders. This is to keep step definitions isolated in their own files and avoid conflicts as well as allow for modularity to make the tests easier to work on individual features without affecting others.

- _customerListSteps.js_
- _customerDetailsSteps.js_
- _panelContactInfoSteps.js_

Each step is organized in the files and grouped around commented out scenario titles for ease of readability.
I created functions that each perform a specific task with descriptive names, relevant to the tests. These are being called in each step to make the tests easy to read, understand and maintain. The functions all live at the bottom of each of the steps files so they are separated and easy to read.

Using the fixtures _clients.json_ and _customerList.json_ for test data in each stepsFile helps separate test data from logic and makes it easieer to maintain and update.

I had to create promise using a _before_ hook that uses _Promise.all_ to load multiple fixtures at once because after several iterations of running the tests, I noticed that the fixtures or test data would not always load before the tests run and would therefore fail. 
I initially had this set using only the _before_ hook but then added _promises.all_ as good practice and to ensure that before each test is run, the fixtures are all loaded beforehand (https://docs.cypress.io/guides/references/best-practices#2-Run-shared-code-before-each-test).
This was a consideration that needed to be taken as cypress runs asynchronously and I needed to make sure that the the relevant fixtures were being called before the scenarios were run.

There are a number of functions that take parameters to make them more flexible and allow for re-usability i.e. _selectCustomerDetails_


_function selectCustomersDetails(client){
    cy.get(`[data-test="${fixtures.panel_customerName}${client.id}"]`).should("be.visible");
    cy.get(`[data-test="${fixtures.viewClients_button}${client.id}"]`).click();
}_


I had written out the fixtures with client.id parameters, as the elements in the _Customers.js_ file had _customer.id_ appended to them, which allowed me to have it written in such a way that when the function _selectCustomersDetails_ is being used in the test, it gave me the flexibility to specify and select which customer data I wanted the test to select.
i.e.

_When("the user selects the option to view details of the first customer from the customer list page",function(){
    selectCustomersDetails(clients.client_1);
});_

*clients.client_1 had been defined in the clients.json fixture with 'id' and 'name' attributes for each client.

I have also added a 'unhappy path' scenario to help test and assert non-existent functions. This was done as a proof to check that a given element does not exist in the UI and is good practice to verify the absence of an element.


**Issues encountered during test runs:**

There were a few issues I encountered whilst working on the .js steps files which were mostly due to having been more accustomed to working with typescript on cypress but were quickly resolved due to similarities with both.

It took me some time figuring out how to best write out the elements that had _client.id_ appended to them as I wasnt entirely familiar with correct style for this, but again this was resolved after few iterations and finding reference points online to help me with this.

Figuring out the best way of running my tests resulted in a number of issues I encountered, which is how I came to the decision of using a before hook with promise.all call as there were multiple runs where my tests couldn't be run because of test data or fixtures not having loaded before each step.
This is however, where I am currently encountering issues with running my tests and am unable to determine how to best resolve it.

The error I am currently getting when running my test is following:

_AssertionError: Timed out retrying after 4000ms: Expected to find element: `undefined`, but never found it._

This error is likely happening as there seems to be an issue with the fixtures not being loaded correctly in the before hook.
I have done following investigation to resolve this:

- debug before hook by using of console.log () to individually check if either the before hook is running before the test, the clients.js file is generating the test data before the steps are run, the fixtures from clientList.js are being loaded before the tests.
- Can confirm that the before hook is being used before the steps run and that the client data is loading correctly. However I ntoed that the fixtures in clientList.js wasn't loading and not showing in console logs so I suspect it to be an issue with how the fixtures are being loaded in the hook.
- Alternatively, I suspected there to be an issue with the function _selectCustomesDetails_ and the elements is meant to interact with arent visible when the function is called. However I dont believe that to be the case as the client data was correctly loading in the tests and when using the cypress time travelling feature to debug and see the state of the app before the error, i could see the element loading correctly which makes me assume its linkeed to the fixtures not being generated.

**Like to haves**

If I had spent more time on this test I would have liked to have set global 'baseURL' to cypress config file to allow for ease of use with cy.visit() command and not needing to hardcode HTTP in the function (https://docs.cypress.io/guides/references/best-practices#Setting-a-Global-baseUrl)
I would have also liked to have added additional API test for GET clientList and GET clients.
