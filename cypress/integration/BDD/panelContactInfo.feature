Feature: Panel contact Info

As a user,
I want to be able to view the list of customers on the panel
So that I have oversight of the latest customers and their contact details

| Glossary: |
| Customer List - The page that displays the list of customers |
| User - The person using the website |
| Customer - The person who has purchased a policy/product from INSHUR |
| Customer contact details - The customers contact details which include phone number and email address |

Scenario: The user can see the customers contact details on the customerlist page
    Given the user navigates to the INSHUR test website
    When the user views the customers on the panel
    Then the user can see the customers contact details on the customer list page

Scenario: The user sees the last customers email address
    Given the user navigates to the INSHUR test website
    When the user views the customers on the panel
    Then the user can see the last customers email address

Scenario: The user sees the first customers phone number
    Given the user navigates to the INSHUR test website
    When the user views the customers on the panel
    Then the user can see the first customers phone number