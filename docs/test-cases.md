# Test Cases — Practice Software Testing

Manual test cases for the E2E scenarios of the
[Practice Software Testing](https://practicesoftwaretesting.com) demo application.
The set covers the cases already automated in `cypress/e2e/` and additional cases
that extend coverage beyond the current suite.

## 1. Conventions

- **ID** — `<SUITE>-<NN>`, e.g. `AUTH-03`
- **Priority** — `P1` — smoke/critical path, `P2` — core functionality, `P3` — edge
- **Type** — `Smoke`, `Functional`, `Negative`, `Validation`, `E2E`, `UI`
- **Environment** — Chrome (desktop), `https://practicesoftwaretesting.com`
- **Preconditions** — application state and data required before the first step
- **Automation** — `Automated` — covered by a spec, `Manual` — not automated
  yet, and a spec that exists but fails or is stale is listed under known issues
  below

Steps are numbered, and the expected result of each step is written on the next
line after the `→ Expected:` marker. Steps use only what a tester sees on screen:
page names, field labels and button captions. When a step has no separate
expectation, it inherits the one from the **Expected result** block.

Steps describe behaviour, not implementation: page addresses and UI selectors
live in the page objects and specs, and the coverage list below maps every case
to the spec that automates it.

---

## 2. Coverage matrix

7 of the 25 cases are automated today — AUTH-01…AUTH-04, SRCH-01, PRD-01 and
CART-01. Everything else is manual and listed in
[section 9](#9-what-to-automate-next) in the recommended order.

Format: **ID** · Priority · Status — Title

#### Authentication (`cypress/e2e/login.cy.js`)

- **AUTH-01** · P1 · Automated — Login with valid credentials
- **AUTH-02** · P1 · Automated — Login with invalid credentials
- **AUTH-03** · P2 · Automated — Submit the login form with empty fields
- **AUTH-04** · P2 · Automated — Invalid email format
- **AUTH-05** · P2 · Manual — Valid email with an incorrect password
- **AUTH-06** · P3 · Manual — Password is masked
- **AUTH-07** · P1 · Manual — Sign out

#### Search (`cypress/e2e/search.cy.js`)

- **SRCH-01** · P1 · Automated — Search for a product and add it to the cart
- **SRCH-02** · P2 · Manual — Search with no results
- **SRCH-03** · P2 · Manual — Partial match and case insensitivity
- **SRCH-04** · P3 · Manual — Search with whitespace and special characters
- **SRCH-05** · P3 · Manual — Clearing the search restores the full catalog

#### Product (`cypress/e2e/product.cy.js`)

- **PRD-01** · P1 · Automated — Product details are displayed
- **PRD-02** · P2 · Manual — Product page data completeness
- **PRD-03** · P3 · Manual — Navigation back to the catalog
- **PRD-04** · P2 · Manual — Changing the quantity before adding to the cart

#### Cart (`cypress/e2e/cart.cy.js`)

- **CART-01** · P1 · Automated — Add a product to the cart
- **CART-02** · P2 · Manual — Add two different products
- **CART-03** · P2 · Manual — Update the quantity in the cart
- **CART-04** · P2 · Manual — Remove a product from the cart
- **CART-05** · P2 · Manual — Empty cart
- **CART-06** · P2 · Manual — Cart persists after a page reload
- **CART-07** · P3 · Manual — Header cart counter

#### Checkout (E2E) — no spec yet

- **E2E-01** · P1 · Manual — Full path: search → cart → place an order
- **E2E-02** · P2 · Manual — Required field validation on the address step

---

## 3. Authentication

### AUTH-01 — Login with valid credentials

**Priority:** P1 · **Type:** Smoke
**Automation:** Automated (`cypress/e2e/login.cy.js`)
**Preconditions:** A registered customer account exists

1. Open the login page
   → Expected: The login form is shown
2. Enter the account email in the Email field
   → Expected: The email is displayed
3. Enter the account password in the Password field
   → Expected: The password is masked
4. Click the Login button
   → Expected: The user is signed in

**Expected result:** the user lands on the Account page, the account menu is
available in the header, and no error message is shown.

> On the public demo the shared seeded account can be locked after too many
> failed attempts ("Account locked"). That is an environment issue, not a product
> defect — see [Known issues](#8-known-issues-and-gaps).

---

### AUTH-02 — Login with invalid credentials

**Priority:** P1 · **Type:** Negative
**Automation:** Automated (`cypress/e2e/login.cy.js`)
**Preconditions:** An invalid email and password pair is available in test data

1. Open the login page
   → Expected: The login form is shown
2. Enter the invalid email in the Email field
   → Expected: The email is displayed
3. Enter the invalid password in the Password field
   → Expected: The password is masked
4. Click the Login button
   → Expected: Sign-in is rejected

**Expected result:** an error message is shown above or below the form, the user
stays on the login page, and no account data becomes accessible.

---

### AUTH-03 — Submit the login form with empty fields

**Priority:** P2 · **Type:** Validation
**Automation:** Automated (`cypress/e2e/login.cy.js`)
**Preconditions:** The user is not signed in

1. Open the login page
   → Expected: The form is empty
2. Click the Login button without typing
   → Expected: No successful sign-in is triggered

**Expected result:** the form shows validation for the Email and Password fields
(or a single form-level error), the user stays on the login page, and no sign-in
request is made.

---

### AUTH-04 — Invalid email format

**Priority:** P2 · **Type:** Validation
**Automation:** Automated (`cypress/e2e/login.cy.js`)
**Preconditions:** The user is not signed in

1. Open the login page
   → Expected: The form is shown
2. Type `abc` in the Email field
   → Expected: The text is accepted
3. Type any password and click the Login button
   → Expected: Validation is triggered

**Expected result:** the form reports an invalid email address (or a generic
sign-in error), and the user is not signed in.

---

### AUTH-05 — Valid email with an incorrect password

**Priority:** P2 · **Type:** Negative
**Automation:** Manual
**Preconditions:** A registered account whose password is deliberately wrong

1. Open the login page
   → Expected: The form is shown
2. Enter the account email in the Email field
   → Expected: The email is displayed
3. Enter a wrong password in the Password field
   → Expected: The password is masked
4. Click the Login button
   → Expected: Sign-in is rejected

**Expected result:** the same error is shown as for any failed sign-in — it must
not reveal whether the email or the password was wrong — and the user stays on
the login page.

---

### AUTH-06 — Password is masked

**Priority:** P3 · **Type:** UI / Security
**Automation:** Manual
**Preconditions:** The login page is open

1. Type a password in the Password field
   → Expected: Characters are displayed as dots, not text
2. Inspect the field in the browser
   → Expected: The password is not exposed as plain text

**Expected result:** the password can never be read from the screen, and the page
does not expose it in plain text.

---

### AUTH-07 — Sign out

**Priority:** P1 · **Type:** Functional
**Automation:** Manual
**Preconditions:** The user is signed in

1. Open the account menu in the header
   → Expected: The Sign out option is visible
2. Click Sign out
   → Expected: The session ends
3. Open the Account page directly
   → Expected: Access is denied

**Expected result:** after signing out the user sees the public part of the site
(or is sent to the login page), and the Account page no longer shows any account
data.

---

## 4. Search

### SRCH-01 — Search for a product and add it to the cart

**Priority:** P1 · **Type:** E2E
**Automation:** Automated (`cypress/e2e/search.cy.js`)
**Preconditions:** The home page is open and the catalog contains "Claw Hammer"

1. Open the home page
   → Expected: The product list is shown
2. Type `Claw Hammer` in the search field
   → Expected: The query appears in the field
3. Click Search
   → Expected: Only products matching the query are listed
4. Click the "Claw Hammer" result
   → Expected: The product page opens
5. Check the product name
   → Expected: It reads "Claw Hammer"
6. Click Add to cart
   → Expected: The product is added to the cart
7. Check the confirmation
   → Expected: "Product added to shopping cart" is shown

**Expected result:** the product found by search opens with the expected name, a
confirmation appears after adding it, and the cart counter in the header grows
by one.

---

### SRCH-02 — Search with no results

**Priority:** P2 · **Type:** Negative
**Automation:** Manual
**Preconditions:** The home page is open

1. Type `zzzz-not-a-product` in the search field
   → Expected: The query is in the field
2. Click Search
   → Expected: The query is executed

**Expected result:** no products are listed, the page shows an empty state or a
"no results" message, and the application does not crash.

---

### SRCH-03 — Partial match and case insensitivity

**Priority:** P2 · **Type:** Functional
**Automation:** Manual
**Preconditions:** The home page is open and "Claw Hammer" exists in the catalog

1. Search for `hammer`
   → Expected: "Claw Hammer" is among the results
2. Clear the field, search for `CLAW`
   → Expected: "Claw Hammer" is among the results

**Expected result:** search ignores letter case and finds partial product names.

---

### SRCH-04 — Search with whitespace and special characters

**Priority:** P3 · **Type:** Edge / Negative
**Automation:** Manual
**Preconditions:** The home page is open

1. Search for a query made of spaces only
   → Expected: The page keeps working
2. Search for `' OR 1=1 --`
   → Expected: The query is treated as plain text

**Expected result:** empty and special-character queries are handled gracefully —
the page is not broken and an empty or complete result list is acceptable, as
long as nothing crashes.

---

### SRCH-05 — Clearing the search restores the full catalog

**Priority:** P3 · **Type:** Functional
**Automation:** Manual
**Preconditions:** A search for `hammer` was performed

1. Clear the search field
   → Expected: The field is empty
2. Click Search
   → Expected: More products are listed

**Expected result:** the full catalog comes back, with at least as many products
as before the search.

---

## 5. Product

### PRD-01 — Product details are displayed

**Priority:** P1 · **Type:** Smoke
**Automation:** Automated (`cypress/e2e/product.cy.js`)
**Preconditions:** The home page is open

1. Click the first product name
   → Expected: The product page opens
2. Check the product name
   → Expected: It matches the product that was clicked
3. Check the Add to cart button
   → Expected: It is visible and enabled

**Expected result:** the product page shows the product name and the Add to cart
button, and the address bar now points to that product.

---

### PRD-02 — Product page data completeness

**Priority:** P2 · **Type:** Functional / UI
**Automation:** Manual
**Preconditions:** Any product page is open

1. Check that a price is displayed
   → Expected: A price in dollars, greater than 0
2. Check the description
   → Expected: It contains text
3. Check the product image
   → Expected: The image is loaded, not broken
4. Check the SKU and brand, if displayed
   → Expected: Both are filled in

**Expected result:** the page shows a name, price, description, image and the Add
to cart button — none of them is empty or a placeholder.

---

### PRD-03 — Navigation back to the catalog

**Priority:** P3 · **Type:** Navigation
**Automation:** Manual
**Preconditions:** A product page is open

1. Click Home in the navigation
   → Expected: The catalog is shown
2. Press the browser Back button
   → Expected: The product page is shown

**Expected result:** navigation works in both directions and the browser history
is not broken.

---

### PRD-04 — Changing the quantity before adding to the cart

**Priority:** P2 · **Type:** Functional
**Automation:** Manual
**Preconditions:** The product page shows a quantity field

1. Set the quantity to `3`
   → Expected: The field shows 3
2. Click Add to cart
   → Expected: The product is added
3. Open the cart
   → Expected: The product row shows quantity 3

**Expected result:** the chosen quantity reaches the cart and the row total equals
price × 3. If the product page has no quantity field, the case is marked `N/A`
and replaced by CART-03.

---

## 6. Cart

### CART-01 — Add a product to the cart

**Priority:** P1 · **Type:** Smoke
**Automation:** Automated (`cypress/e2e/cart.cy.js`)
**Preconditions:** The home page is open

1. Open the first product
   → Expected: The product page opens
2. Check the Add to cart button
   → Expected: It is visible and enabled
3. Click Add to cart
   → Expected: The product is added
4. Check the confirmation
   → Expected: "Product added to shopping cart" is shown

**Expected result:** the product is in the cart, a confirmation is shown, and the
cart counter in the header has increased.

---

### CART-02 — Add two different products

**Priority:** P2 · **Type:** Functional
**Automation:** Manual
**Preconditions:** The cart is empty

1. Add the first product from the catalog
   → Expected: The product is in the cart
2. Go back and add a second product
   → Expected: Both products are in the cart
3. Open the cart
   → Expected: Two different products are listed

**Expected result:** the cart lists both products, the counter shows 2, and the
total equals the sum of both prices.

---

### CART-03 — Update the quantity in the cart

**Priority:** P2 · **Type:** Functional
**Automation:** Manual
**Preconditions:** The cart has one item

1. Open the cart
   → Expected: The product shows quantity 1
2. Increase the quantity to 3
   → Expected: The row shows quantity 3
3. Check the row total
   → Expected: It equals price × 3
4. Check the order total
   → Expected: It is updated accordingly

**Expected result:** totals are recalculated without reloading the page and the
header counter matches the new quantity.

---

### CART-04 — Remove a product from the cart

**Priority:** P2 · **Type:** Functional
**Automation:** Manual
**Preconditions:** The cart has 2 items

1. Open the cart
   → Expected: Two products are listed
2. Click Remove on the first row
   → Expected: The row disappears
3. Check the cart
   → Expected: One product remains

**Expected result:** the removed product does not come back after a page reload,
and the counter and total are recalculated.

---

### CART-05 — Empty cart

**Priority:** P2 · **Type:** UI
**Automation:** Manual
**Preconditions:** The cart is empty (new session)

1. Open the cart page
   → Expected: An empty state or message is shown
2. Check the checkout button
   → Expected: It is disabled, or checkout cannot proceed

**Expected result:** a clear empty-cart message is shown and no checkout can be
started.

---

### CART-06 — Cart persists after a page reload

**Priority:** P2 · **Type:** Persistence
**Automation:** Manual
**Preconditions:** The cart has an item

1. Reload the page
   → Expected: The page reloads
2. Open the cart
   → Expected: The product is still listed

**Expected result:** the cart survives a reload and the header counter stays
correct.

---

### CART-07 — Header cart counter

**Priority:** P3 · **Type:** UI
**Automation:** Manual
**Preconditions:** The cart is empty

1. Check the cart counter
   → Expected: It shows 0 or is hidden
2. Add one product
   → Expected: The counter shows 1
3. Add the same product again
   → Expected: The counter shows 2
4. Remove all products
   → Expected: The counter shows 0

**Expected result:** the counter always matches the number of units in the cart.

---

## 7. Checkout (E2E)

### E2E-01 — Full path: search → cart → place an order

**Priority:** P1 · **Type:** E2E
**Automation:** Manual
**Preconditions:** A registered account exists and the cart is empty

1. Search for `Claw Hammer` and open the product
   → Expected: The product page opens
2. Click Add to cart
   → Expected: The product is in the cart
3. Open the cart
   → Expected: One product is listed with a total
4. Click Proceed to checkout
   → Expected: The Sign in step is shown
5. Sign in with valid credentials
   → Expected: The Billing address step is shown
6. Fill in the required address fields
   → Expected: The form is complete
7. Click Proceed
   → Expected: The Payment step is shown
8. Choose Cash on Delivery and click Finish
   → Expected: The order is placed

**Expected result:** a confirmation with an invoice number is shown, the cart is
emptied, and the order appears in the account's invoices.

---

### E2E-02 — Required field validation on the address step

**Priority:** P2 · **Type:** Validation / Negative
**Automation:** Manual
**Preconditions:** The cart has one item and the Sign in step is done

1. Leave the address fields empty
   → Expected: The fields are empty
2. Click Proceed
   → Expected: The step is not completed
3. Check the messages
   → Expected: Every required field is flagged
4. Fill in the fields correctly and click Proceed
   → Expected: The Payment step is shown

**Expected result:** the order cannot continue without the required address data,
the messages explain what is missing, and the step passes once the data is
corrected.

---

## 8. Known issues and gaps

1. **The cart contents are not verified.** CART-01 only checks the confirmation
   message, not the cart row. A product-row assertion should be added.
2. **There is no negative/validation case for checkout** — the highest-risk part
   of the application after search.
3. **AUTH-01 is environment-dependent on the public demo.** The demo shares one
   seeded account, which gets locked after too many failed sign-in attempts
   ("Account locked, too many failed attempts"). When that happens AUTH-01 fails
   for environmental reasons, not because of a product defect. The CI run uses
   the local seeded account from `docker-compose.ci.yml` and is not affected.
4. **The public demo is behind Cloudflare.** CI cannot target
   `practicesoftwaretesting.com` (403 for GitHub-hosted runners), so the checkout
   E2E cases must run against the local application from `docker-compose.ci.yml`
   (`BASE_URL=http://localhost:4200`).

## 9. What to automate next

1. AUTH-05 — the remaining negative login case (valid email, wrong password),
   using the existing login page object.
2. CART-05, CART-06 and CART-07 — no new page objects needed, only cart
   selectors.
3. E2E-01 — the main business scenario; requires a new checkout page object.
4. E2E-02 — once the checkout page object is stable.
