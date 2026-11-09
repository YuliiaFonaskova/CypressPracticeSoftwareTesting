# Test Cases — Practice Software Testing

Manual test cases for the E2E scenarios of the
[Practice Software Testing](https://practicesoftwaretesting.com) demo application.
The set covers the cases already automated in `cypress/e2e/` and additional cases
that extend coverage beyond the current suite.

## 1. Conventions

| Field             | Value                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------- |
| **ID**            | `<SUITE>-<NN>`, e.g. `AUTH-03`                                                           |
| **Priority**      | `P1` — smoke/critical path, `P2` — core functionality, `P3` — edge                       |
| **Type**          | `Smoke`, `Functional`, `Negative`, `Validation`, `E2E`, `UI`                             |
| **Environment**   | Chrome (desktop), `https://practicesoftwaretesting.com`                                  |
| **Preconditions** | Application state and data required before the first step                                |
| **Automation**    | ✅ — covered by a spec, ⚠️ — spec exists but the test fails/is stale, ❌ — not automated |

Steps are written as "Action → Expected result" and use only what a tester sees
on screen: page names, field labels and button captions. When a step has no
separate expectation, it inherits the one from the **Expected result** block.

Steps describe behaviour, not implementation: page addresses and UI selectors
live in the page objects and specs, and the coverage matrix below maps every case
to the spec that automates it.

---

## 2. Coverage matrix

| ID      | Suite          | Automation | Spec                        |
| ------- | -------------- | ---------- | --------------------------- |
| AUTH-01 | Authentication | ✅         | `cypress/e2e/login.cy.js`   |
| AUTH-02 | Authentication | ✅         | `cypress/e2e/login.cy.js`   |
| AUTH-03 | Authentication | ❌         | —                           |
| AUTH-04 | Authentication | ❌         | —                           |
| AUTH-05 | Authentication | ❌         | —                           |
| AUTH-06 | Authentication | ❌         | —                           |
| AUTH-07 | Authentication | ❌         | —                           |
| SRCH-01 | Search         | ✅         | `cypress/e2e/search.cy.js`  |
| SRCH-02 | Search         | ❌         | —                           |
| SRCH-03 | Search         | ❌         | —                           |
| SRCH-04 | Search         | ❌         | —                           |
| SRCH-05 | Search         | ❌         | —                           |
| PRD-01  | Product        | ✅         | `cypress/e2e/product.cy.js` |
| PRD-02  | Product        | ❌         | —                           |
| PRD-03  | Product        | ❌         | —                           |
| PRD-04  | Product        | ❌         | —                           |
| CART-01 | Cart           | ✅         | `cypress/e2e/cart.cy.js`    |
| CART-02 | Cart           | ❌         | —                           |
| CART-03 | Cart           | ❌         | —                           |
| CART-04 | Cart           | ❌         | —                           |
| CART-05 | Cart           | ❌         | —                           |
| CART-06 | Cart           | ❌         | —                           |
| CART-07 | Cart           | ❌         | —                           |
| E2E-01  | Checkout       | ❌         | —                           |
| E2E-02  | Checkout       | ❌         | —                           |

---

## 3. Authentication

### AUTH-01 — Login with valid credentials

| Field         | Value                                |
| ------------- | ------------------------------------ |
| Priority      | P1                                   |
| Type          | Smoke                                |
| Automation    | ✅ `cypress/e2e/login.cy.js`         |
| Preconditions | A registered customer account exists |

| #   | Action                                           | Expected result         |
| --- | ------------------------------------------------ | ----------------------- |
| 1   | Open the login page                              | The login form is shown |
| 2   | Enter the account email in the Email field       | The email is displayed  |
| 3   | Enter the account password in the Password field | The password is masked  |
| 4   | Click the Login button                           | The user is signed in   |

**Expected result:** the user lands on the Account page, the account menu is
available in the header, and no error message is shown.

---

### AUTH-02 — Login with invalid credentials

| Field         | Value                                                        |
| ------------- | ------------------------------------------------------------ |
| Priority      | P1                                                           |
| Type          | Negative                                                     |
| Automation    | ✅ `cypress/e2e/login.cy.js`                                 |
| Preconditions | An invalid email and password pair is available in test data |

| #   | Action                                           | Expected result         |
| --- | ------------------------------------------------ | ----------------------- |
| 1   | Open the login page                              | The login form is shown |
| 2   | Enter the invalid email in the Email field       | The email is displayed  |
| 3   | Enter the invalid password in the Password field | The password is masked  |
| 4   | Click the Login button                           | Sign-in is rejected     |

**Expected result:** an error message is shown above or below the form, the user
stays on the login page, and no account data becomes accessible.

---

### AUTH-03 — Submit the login form with empty fields

| Field         | Value                     |
| ------------- | ------------------------- |
| Priority      | P2                        |
| Type          | Validation                |
| Automation    | ❌                        |
| Preconditions | The user is not signed in |

| #   | Action                                | Expected result                    |
| --- | ------------------------------------- | ---------------------------------- |
| 1   | Open the login page                   | The form is empty                  |
| 2   | Click the Login button without typing | No successful sign-in is triggered |

**Expected result:** the form shows validation for the Email and Password fields
(or a single form-level error), the user stays on the login page, and no sign-in
request is made.

---

### AUTH-04 — Invalid email format

| Field         | Value                     |
| ------------- | ------------------------- |
| Priority      | P2                        |
| Type          | Validation                |
| Automation    | ❌                        |
| Preconditions | The user is not signed in |

| #   | Action                                       | Expected result         |
| --- | -------------------------------------------- | ----------------------- |
| 1   | Open the login page                          | The form is shown       |
| 2   | Type `abc` in the Email field                | The text is accepted    |
| 3   | Type any password and click the Login button | Validation is triggered |

**Expected result:** the form reports an invalid email address (or a generic
sign-in error), and the user is not signed in.

---

### AUTH-05 — Valid email with an incorrect password

| Field         | Value                                                     |
| ------------- | --------------------------------------------------------- |
| Priority      | P2                                                        |
| Type          | Negative                                                  |
| Automation    | ❌                                                        |
| Preconditions | A registered account whose password is deliberately wrong |

| #   | Action                                       | Expected result        |
| --- | -------------------------------------------- | ---------------------- |
| 1   | Open the login page                          | The form is shown      |
| 2   | Enter the account email in the Email field   | The email is displayed |
| 3   | Enter a wrong password in the Password field | The password is masked |
| 4   | Click the Login button                       | Sign-in is rejected    |

**Expected result:** the same error is shown as for any failed sign-in — it must
not reveal whether the email or the password was wrong — and the user stays on
the login page.

---

### AUTH-06 — Password is masked

| Field         | Value                  |
| ------------- | ---------------------- |
| Priority      | P3                     |
| Type          | UI / Security          |
| Automation    | ❌                     |
| Preconditions | The login page is open |

| #   | Action                                | Expected result                            |
| --- | ------------------------------------- | ------------------------------------------ |
| 1   | Type a password in the Password field | Characters are displayed as dots, not text |
| 2   | Inspect the field in the browser      | The password is not exposed as plain text  |

**Expected result:** the password can never be read from the screen, and the page
does not expose it in plain text.

---

### AUTH-07 — Sign out

| Field         | Value                 |
| ------------- | --------------------- |
| Priority      | P1                    |
| Type          | Functional            |
| Automation    | ❌                    |
| Preconditions | The user is signed in |

| #   | Action                              | Expected result                |
| --- | ----------------------------------- | ------------------------------ |
| 1   | Open the account menu in the header | The Sign out option is visible |
| 2   | Click Sign out                      | The session ends               |
| 3   | Open the Account page directly      | Access is denied               |

**Expected result:** after signing out the user sees the public part of the site
(or is sent to the login page), and the Account page no longer shows any account
data.

---

## 4. Search

### SRCH-01 — Search for a product and add it to the cart

| Field         | Value                                                        |
| ------------- | ------------------------------------------------------------ |
| Priority      | P1                                                           |
| Type          | E2E                                                          |
| Automation    | ✅ `cypress/e2e/search.cy.js`                                |
| Preconditions | The home page is open and the catalog contains "Claw Hammer" |

| #   | Action                                 | Expected result                             |
| --- | -------------------------------------- | ------------------------------------------- |
| 1   | Open the home page                     | The product list is shown                   |
| 2   | Type `Claw Hammer` in the search field | The query appears in the field              |
| 3   | Click Search                           | Only products matching the query are listed |
| 4   | Click the "Claw Hammer" result         | The product page opens                      |
| 5   | Check the product name                 | It reads "Claw Hammer"                      |
| 6   | Click Add to cart                      | The product is added to the cart            |
| 7   | Check the confirmation                 | "Product added to shopping cart" is shown   |

**Expected result:** the product found by search opens with the expected name, a
confirmation appears after adding it, and the cart counter in the header grows
by one.

---

### SRCH-02 — Search with no results

| Field         | Value                 |
| ------------- | --------------------- |
| Priority      | P2                    |
| Type          | Negative              |
| Automation    | ❌                    |
| Preconditions | The home page is open |

| #   | Action                                        | Expected result           |
| --- | --------------------------------------------- | ------------------------- |
| 1   | Type `zzzz-not-a-product` in the search field | The query is in the field |
| 2   | Click Search                                  | The query is executed     |

**Expected result:** no products are listed, the page shows an empty state or a
"no results" message, and the application does not crash.

---

### SRCH-03 — Partial match and case insensitivity

| Field         | Value                                                         |
| ------------- | ------------------------------------------------------------- |
| Priority      | P2                                                            |
| Type          | Functional                                                    |
| Automation    | ❌                                                            |
| Preconditions | The home page is open and "Claw Hammer" exists in the catalog |

| #   | Action                             | Expected result                    |
| --- | ---------------------------------- | ---------------------------------- |
| 1   | Search for `hammer`                | "Claw Hammer" is among the results |
| 2   | Clear the field, search for `CLAW` | "Claw Hammer" is among the results |

**Expected result:** search ignores letter case and finds partial product names.

---

### SRCH-04 — Search with whitespace and special characters

| Field         | Value                 |
| ------------- | --------------------- |
| Priority      | P3                    |
| Type          | Edge / Negative       |
| Automation    | ❌                    |
| Preconditions | The home page is open |

| #   | Action                                 | Expected result                    |
| --- | -------------------------------------- | ---------------------------------- |
| 1   | Search for a query made of spaces only | The page keeps working             |
| 2   | Search for `' OR 1=1 --`               | The query is treated as plain text |

**Expected result:** empty and special-character queries are handled gracefully —
the page is not broken and an empty or complete result list is acceptable, as
long as nothing crashes.

---

### SRCH-05 — Clearing the search restores the full catalog

| Field         | Value                               |
| ------------- | ----------------------------------- |
| Priority      | P3                                  |
| Type          | Functional                          |
| Automation    | ❌                                  |
| Preconditions | A search for `hammer` was performed |

| #   | Action                 | Expected result          |
| --- | ---------------------- | ------------------------ |
| 1   | Clear the search field | The field is empty       |
| 2   | Click Search           | More products are listed |

**Expected result:** the full catalog comes back, with at least as many products
as before the search.

---

## 5. Product

### PRD-01 — Product details are displayed

| Field         | Value                          |
| ------------- | ------------------------------ |
| Priority      | P1                             |
| Type          | Smoke                          |
| Automation    | ✅ `cypress/e2e/product.cy.js` |
| Preconditions | The home page is open          |

| #   | Action                       | Expected result                         |
| --- | ---------------------------- | --------------------------------------- |
| 1   | Click the first product name | The product page opens                  |
| 2   | Check the product name       | It matches the product that was clicked |
| 3   | Check the Add to cart button | It is visible and enabled               |

**Expected result:** the product page shows the product name and the Add to cart
button, and the address bar now points to that product.

---

### PRD-02 — Product page data completeness

| Field         | Value                    |
| ------------- | ------------------------ |
| Priority      | P2                       |
| Type          | Functional / UI          |
| Automation    | ❌                       |
| Preconditions | Any product page is open |

| #   | Action                                | Expected result                    |
| --- | ------------------------------------- | ---------------------------------- |
| 1   | Check that a price is displayed       | A price in dollars, greater than 0 |
| 2   | Check the description                 | It contains text                   |
| 3   | Check the product image               | The image is loaded, not broken    |
| 4   | Check the SKU and brand, if displayed | Both are filled in                 |

**Expected result:** the page shows a name, price, description, image and the Add
to cart button — none of them is empty or a placeholder.

---

### PRD-03 — Navigation back to the catalog

| Field         | Value                  |
| ------------- | ---------------------- |
| Priority      | P3                     |
| Type          | Navigation             |
| Automation    | ❌                     |
| Preconditions | A product page is open |

| #   | Action                        | Expected result           |
| --- | ----------------------------- | ------------------------- |
| 1   | Click Home in the navigation  | The catalog is shown      |
| 2   | Press the browser Back button | The product page is shown |

**Expected result:** navigation works in both directions and the browser history
is not broken.

---

### PRD-04 — Changing the quantity before adding to the cart

| Field         | Value                                   |
| ------------- | --------------------------------------- |
| Priority      | P2                                      |
| Type          | Functional                              |
| Automation    | ❌                                      |
| Preconditions | The product page shows a quantity field |

| #   | Action                  | Expected result                  |
| --- | ----------------------- | -------------------------------- |
| 1   | Set the quantity to `3` | The field shows 3                |
| 2   | Click Add to cart       | The product is added             |
| 3   | Open the cart           | The product row shows quantity 3 |

**Expected result:** the chosen quantity reaches the cart and the row total equals
price × 3. If the product page has no quantity field, the case is marked `N/A`
and replaced by CART-03.

---

## 6. Cart

### CART-01 — Add a product to the cart

| Field         | Value                       |
| ------------- | --------------------------- |
| Priority      | P1                          |
| Type          | Smoke                       |
| Automation    | ✅ `cypress/e2e/cart.cy.js` |
| Preconditions | The home page is open       |

| #   | Action                       | Expected result                           |
| --- | ---------------------------- | ----------------------------------------- |
| 1   | Open the first product       | The product page opens                    |
| 2   | Check the Add to cart button | It is visible and enabled                 |
| 3   | Click Add to cart            | The product is added                      |
| 4   | Check the confirmation       | "Product added to shopping cart" is shown |

**Expected result:** the product is in the cart, a confirmation is shown, and the
cart counter in the header has increased.

---

### CART-02 — Add two different products

| Field         | Value             |
| ------------- | ----------------- |
| Priority      | P2                |
| Type          | Functional        |
| Automation    | ❌                |
| Preconditions | The cart is empty |

| #   | Action                                 | Expected result                   |
| --- | -------------------------------------- | --------------------------------- |
| 1   | Add the first product from the catalog | The product is in the cart        |
| 2   | Go back and add a second product       | Both products are in the cart     |
| 3   | Open the cart                          | Two different products are listed |

**Expected result:** the cart lists both products, the counter shows 2, and the
total equals the sum of both prices.

---

### CART-03 — Update the quantity in the cart

| Field         | Value                 |
| ------------- | --------------------- |
| Priority      | P2                    |
| Type          | Functional            |
| Automation    | ❌                    |
| Preconditions | The cart has one item |

| #   | Action                     | Expected result              |
| --- | -------------------------- | ---------------------------- |
| 1   | Open the cart              | The product shows quantity 1 |
| 2   | Increase the quantity to 3 | The row shows quantity 3     |
| 3   | Check the row total        | It equals price × 3          |
| 4   | Check the order total      | It is updated accordingly    |

**Expected result:** totals are recalculated without reloading the page and the
header counter matches the new quantity.

---

### CART-04 — Remove a product from the cart

| Field         | Value                |
| ------------- | -------------------- |
| Priority      | P2                   |
| Type          | Functional           |
| Automation    | ❌                   |
| Preconditions | The cart has 2 items |

| #   | Action                        | Expected result         |
| --- | ----------------------------- | ----------------------- |
| 1   | Open the cart                 | Two products are listed |
| 2   | Click Remove on the first row | The row disappears      |
| 3   | Check the cart                | One product remains     |

**Expected result:** the removed product does not come back after a page reload,
and the counter and total are recalculated.

---

### CART-05 — Empty cart

| Field         | Value                           |
| ------------- | ------------------------------- |
| Priority      | P2                              |
| Type          | UI                              |
| Automation    | ❌                              |
| Preconditions | The cart is empty (new session) |

| #   | Action                    | Expected result                            |
| --- | ------------------------- | ------------------------------------------ |
| 1   | Open the cart page        | An empty state or message is shown         |
| 2   | Check the checkout button | It is disabled, or checkout cannot proceed |

**Expected result:** a clear empty-cart message is shown and no checkout can be
started.

---

### CART-06 — Cart persists after a page reload

| Field         | Value                |
| ------------- | -------------------- |
| Priority      | P2                   |
| Type          | Persistence          |
| Automation    | ❌                   |
| Preconditions | The cart has an item |

| #   | Action          | Expected result             |
| --- | --------------- | --------------------------- |
| 1   | Reload the page | The page reloads            |
| 2   | Open the cart   | The product is still listed |

**Expected result:** the cart survives a reload and the header counter stays
correct.

---

### CART-07 — Header cart counter

| Field         | Value             |
| ------------- | ----------------- |
| Priority      | P3                |
| Type          | UI                |
| Automation    | ❌                |
| Preconditions | The cart is empty |

| #   | Action                     | Expected result         |
| --- | -------------------------- | ----------------------- |
| 1   | Check the cart counter     | It shows 0 or is hidden |
| 2   | Add one product            | The counter shows 1     |
| 3   | Add the same product again | The counter shows 2     |
| 4   | Remove all products        | The counter shows 0     |

**Expected result:** the counter always matches the number of units in the cart.

---

## 7. Checkout (E2E)

### E2E-01 — Full path: search → cart → place an order

| Field         | Value                                             |
| ------------- | ------------------------------------------------- |
| Priority      | P1                                                |
| Type          | E2E                                               |
| Automation    | ❌                                                |
| Preconditions | A registered account exists and the cart is empty |

| #   | Action                                        | Expected result                    |
| --- | --------------------------------------------- | ---------------------------------- |
| 1   | Search for `Claw Hammer` and open the product | The product page opens             |
| 2   | Click Add to cart                             | The product is in the cart         |
| 3   | Open the cart                                 | One product is listed with a total |
| 4   | Click Proceed to checkout                     | The Sign in step is shown          |
| 5   | Sign in with valid credentials                | The Billing address step is shown  |
| 6   | Fill in the required address fields           | The form is complete               |
| 7   | Click Proceed                                 | The Payment step is shown          |
| 8   | Choose Cash on Delivery and click Finish      | The order is placed                |

**Expected result:** a confirmation with an invoice number is shown, the cart is
emptied, and the order appears in the account's invoices.

---

### E2E-02 — Required field validation on the address step

| Field         | Value                                              |
| ------------- | -------------------------------------------------- |
| Priority      | P2                                                 |
| Type          | Validation / Negative                              |
| Automation    | ❌                                                 |
| Preconditions | The cart has one item and the Sign in step is done |

| #   | Action                                         | Expected result                 |
| --- | ---------------------------------------------- | ------------------------------- |
| 1   | Leave the address fields empty                 | The fields are empty            |
| 2   | Click Proceed                                  | The step is not completed       |
| 3   | Check the messages                             | Every required field is flagged |
| 4   | Fill in the fields correctly and click Proceed | The Payment step is shown       |

**Expected result:** the order cannot continue without the required address data,
the messages explain what is missing, and the step passes once the data is
corrected.

---

## 8. Known issues and gaps

1. **The cart contents are not verified.** CART-01 only checks the confirmation
   message, not the cart row. A product-row assertion should be added.
2. **There is no negative/validation case for checkout** — the highest-risk part
   of the application after search.
3. **The public demo is behind Cloudflare.** CI cannot target
   `practicesoftwaretesting.com` (403 for GitHub-hosted runners), so the checkout
   E2E cases must run against the local application from `docker-compose.ci.yml`
   (`BASE_URL=http://localhost:4200`).

## 9. What to automate next

1. AUTH-03, AUTH-04 and AUTH-05 — cheap, fast, and they cover the negative login
   path using the existing login page object.
2. CART-05, CART-06 and CART-07 — no new page objects needed, only cart
   selectors.
3. E2E-01 — the main business scenario; requires a new checkout page object.
4. E2E-02 — once the checkout page object is stable.
