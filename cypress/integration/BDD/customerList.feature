Feature: Customer List

As a user,
I want to be able to view the list of customers
So that I can select a customer to view their details

| Glossary: |
| Customer List - The page that displays the list of customers |
| User - The person using the website |
| Customer - The person who has purchased a policy/product from INSHUR |
| Customer details - The page that displays the details of the customer (i.e. name, email, phone number, city, country, state, organization, job profile, additional info) |

Scenario: The user can select the option to view a customers details
    Given the user navigates to the INSHUR test website
    When the user selects the option to view details of a customer from the customer list page
    Then the user is navigated to the customer details page of the user