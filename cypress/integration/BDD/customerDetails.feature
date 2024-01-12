Feature: Customer Details

As a user,
I want to be able to select a customer from the list of customers
So that I can view their details

| Glossary: |
| CustomerList - The page that displays the list of customers |
| User - The person using the website |
| Customer - The person who has purchased a policy/product from INSHUR |
| Customer details - The page that displays the details of the customer (i.e. name, email, phone number, city, country, state, organization, job profile, additional info) |

Scenario: The user can see the customer details of a high value customer
    Given the user navigates to the INSHUR test website
    When the user selects the option to view details of the first customer from the customer list page
    Then the user is navigated to the customer details page of the high value customer

Scenario: The user can see the organization of a Horsham based customer
    Given the user navigates to the INSHUR test website
    When the user selects the option to view details of the last customer from the customer list page
    Then the user can see the name of the organziation of the Horsham based customer

Scenario: The user can see the job profile of a customer that rarely buys products
    Given the user navigates to the INSHUR test website
    When the user selects the option to view details of the second customer from the customer list page
    Then the user can see the job profile of the customer that rarely buys products

Scenario: The user can see the contact info on the panel correctly matches the customer details
    Given the user navigates to the INSHUR test website
    When the user selects the option to view details of the first customer from the customer list page
    Then the user can see the contact info on the panel correctly matches the customer details

Scenario: The user is unable to see a clients purchase history on the customer details page
    Given the user navigates to the INSHUR test website
    When the user selects the option to view details of the first customer from the customer list page
    Then the user is unable to see a clients purchase history on the customer details page