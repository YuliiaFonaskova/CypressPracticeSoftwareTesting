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

Steps are written as "Action → Expected result". When a step has no separate
expectation, it inherits the one from the **Expected result** block.

Selector legend: `[data-test="..."]` are the stable test ids used by
`BasePage.getByTestId()`. They are included so each case can be automated
directly.

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

| Field         | Value                                                                        |
| ------------- | ---------------------------------------------------------------------------- |
| Priority      | P1                                                                           |
| Type          | Smoke                                                                        |
| Automation    | ✅ `cypress/e2e/login.cy.js` — "logs in with valid credentials"              |
| Preconditions | An active account exists; `USER_EMAIL` and `USER_PASSWORD` are set in `.env` |

| #   | Action                                            | Expected result              |
| --- | ------------------------------------------------- | ---------------------------- |
| 1   | Open `/auth/login`                                | The login form is shown      |
| 2   | Enter `USER_EMAIL` in `[data-test="email"]`       | The field contains the email |
| 3   | Enter `USER_PASSWORD` in `[data-test="password"]` | The password is masked       |
| 4   | Click `[data-test="login-submit"]`                | Redirect to `/account`       |

**Expected result:** the user is authenticated, the URL is `/account`, account
entries (Profile, Invoices, etc.) are available in the header, and no error
message is displayed.

---

### AUTH-02 — Login with invalid credentials

| Field         | Value                                                                               |
| ------------- | ----------------------------------------------------------------------------------- |
| Priority      | P1                                                                                  |
| Type          | Negative                                                                            |
| Automation    | ✅ `cypress/e2e/login.cy.js` — "displays an error message with invalid credentials" |
| Preconditions | Data from `cypress/fixtures/users.json` (`users.invalid`)                           |

| #   | Action                              | Expected result                    |
| --- | ----------------------------------- | ---------------------------------- |
| 1   | Open `/auth/login`                  | The login form is shown            |
| 2   | Enter an invalid email and password | The values are accepted            |
| 3   | Click `[data-test="login-submit"]`  | The authentication request is sent |

**Expected result:** `[data-test="login-error"]` is displayed with a non-empty
message; the URL stays at `/auth/login`; the user is not authenticated.

---

### AUTH-03 — Submit the login form with empty fields

| Field         | Value                     |
| ------------- | ------------------------- |
| Priority      | P2                        |
| Type          | Validation                |
| Automation    | ❌                        |
| Preconditions | The user is not signed in |

| #   | Action                                           | Expected result                  |
| --- | ------------------------------------------------ | -------------------------------- |
| 1   | Open `/auth/login`                               | The form is empty                |
| 2   | Click `[data-test="login-submit"]` without input | No successful login is triggered |

**Expected result:** validation is shown for the Email and Password fields (or a
single form-level error); no request is sent to `/users/login`; the URL does not
change.

---

### AUTH-04 — Invalid email format

| Field         | Value                     |
| ------------- | ------------------------- |
| Priority      | P2                        |
| Type          | Validation                |
| Automation    | ❌                        |
| Preconditions | The user is not signed in |

| #   | Action                             | Expected result            |
| --- | ---------------------------------- | -------------------------- |
| 1   | Open `/auth/login`                 | The form is shown          |
| 2   | Enter `abc` in the Email field     | The field accepts the text |
| 3   | Enter any password and click Login | Validation is triggered    |

**Expected result:** an invalid-email message is shown (or a generic login error);
there is no redirect to `/account`.

---

### AUTH-05 — Valid email with an incorrect password

| Field         | Value                                                               |
| ------------- | ------------------------------------------------------------------- |
| Priority      | P2                                                                  |
| Type          | Negative                                                            |
| Automation    | ❌                                                                  |
| Preconditions | The `USER_EMAIL` account exists; the password is deliberately wrong |

| #   | Action                                  | Expected result            |
| --- | --------------------------------------- | -------------------------- |
| 1   | Open `/auth/login`                      | The form is shown          |
| 2   | Enter `USER_EMAIL` and a wrong password | The values are accepted    |
| 3   | Click Login                             | Authentication is rejected |

**Expected result:** an error identical to AUTH-02 is shown (it must not reveal
whether the email or the password was wrong); the URL stays at `/auth/login`.

---

### AUTH-06 — Password is masked

| Field         | Value                 |
| ------------- | --------------------- |
| Priority      | P3                    |
| Type          | UI / Security         |
| Automation    | ❌                    |
| Preconditions | `/auth/login` is open |

| #   | Action                                    | Expected result                   |
| --- | ----------------------------------------- | --------------------------------- |
| 1   | Enter `Secret123!` in the Password field  | Characters are rendered as `••••` |
| 2   | Inspect the `type` attribute of the field | `type="password"`                 |

**Expected result:** the password is never displayed as plain text, and no
plain-text password value is exposed in the DOM outside the expected `value`
attribute.

---

### AUTH-07 — Sign out

| Field         | Value                               |
| ------------- | ----------------------------------- |
| Priority      | P1                                  |
| Type          | Functional                          |
| Automation    | ❌                                  |
| Preconditions | The user is signed in (see AUTH-01) |

| #   | Action                              | Expected result       |
| --- | ----------------------------------- | --------------------- |
| 1   | Open the account menu in the header | "Sign out" is visible |
| 2   | Click "Sign out"                    | The session ends      |
| 3   | Navigate directly to `/account`     | Access is denied      |

**Expected result:** after signing out the user sees the public site (or is
redirected to `/auth/login`); navigating straight to `/account` does not expose
account data and returns to the login page.

---

## 4. Search

### SRCH-01 — Search for a product and add it to the cart

| Field         | Value                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------- |
| Priority      | P1                                                                                        |
| Type          | E2E                                                                                       |
| Automation    | ✅ `cypress/e2e/search.cy.js` — "searches for a product and adds it to the shopping cart" |
| Preconditions | The home page is available; `testData.search.productName = "Claw Hammer"`                 |

| #   | Action                                              | Expected result                        |
| --- | --------------------------------------------------- | -------------------------------------- |
| 1   | Open `/`                                            | The product list is loaded             |
| 2   | Enter `Claw Hammer` in `[data-test="search-query"]` | The field contains the query           |
| 3   | Click `[data-test="search-submit"]`                 | Only matching products are shown       |
| 4   | Click a `[data-test="product-name"]` result         | The `/product/{id}` page opens         |
| 5   | Check the `h1` heading                              | It contains "Claw Hammer"              |
| 6   | Click `[data-test="add-to-cart"]`                   | The product is added                   |
| 7   | Check the confirmation                              | "Product added to shopping cart" shows |

**Expected result:** the product found by search opens, its title matches the
query, the add-to-cart button is enabled, a confirmation appears after the
click, and the header cart counter increases by 1.

---

### SRCH-02 — Search with no results

| Field         | Value                 |
| ------------- | --------------------- |
| Priority      | P2                    |
| Type          | Negative              |
| Automation    | ❌                    |
| Preconditions | The home page is open |

| #   | Action                                         | Expected result              |
| --- | ---------------------------------------------- | ---------------------------- |
| 1   | Enter `zzzz-not-a-product` in the search field | The field contains the query |
| 2   | Click Search                                   | The query is executed        |

**Expected result:** the product list is empty (0 `[data-test="product-name"]`
cards), an empty state or a "no results" message is shown, and the application
does not crash or return a 500 error.

---

### SRCH-03 — Partial match and case insensitivity

| Field         | Value                                                 |
| ------------- | ----------------------------------------------------- |
| Priority      | P2                                                    |
| Type          | Functional                                            |
| Automation    | ❌                                                    |
| Preconditions | The home page is open; a "Claw Hammer" product exists |

| #   | Action                             | Expected result                          |
| --- | ---------------------------------- | ---------------------------------------- |
| 1   | Search for `hammer`                | At least 1 result, including Claw Hammer |
| 2   | Clear the field, search for `CLAW` | At least 1 result, including Claw Hammer |

**Expected result:** search is case-insensitive and matches partial product
names.

---

### SRCH-04 — Search with whitespace and special characters

| Field         | Value                 |
| ------------- | --------------------- |
| Priority      | P3                    |
| Type          | Edge / Negative       |
| Automation    | ❌                    |
| Preconditions | The home page is open |

| #   | Action                             | Expected result                         |
| --- | ---------------------------------- | --------------------------------------- |
| 1   | Search for `   ` (whitespace only) | The empty query does not break the page |
| 2   | Search for `' OR 1=1 --`           | Characters are escaped, no error shown  |

**Expected result:** the application handles empty and special-character queries
correctly; there are no SQL/JS errors in the console or on the page, and the
result set is either empty or the full catalog — the key requirement is that it
does not crash.

---

### SRCH-05 — Clearing the search restores the full catalog

| Field         | Value                                             |
| ------------- | ------------------------------------------------- |
| Priority      | P3                                                |
| Type          | Functional                                        |
| Automation    | ❌                                                |
| Preconditions | A search for `hammer` was performed (see SRCH-03) |

| #   | Action                             | Expected result        |
| --- | ---------------------------------- | ---------------------- |
| 1   | Clear `[data-test="search-query"]` | The field is empty     |
| 2   | Click Search                       | The result set expands |

**Expected result:** after clearing the query the full catalog is shown (at least
as many cards as before the search), and filters/pagination are displayed.

---

## 5. Product

### PRD-01 — Product details are displayed

| Field         | Value                                                       |
| ------------- | ----------------------------------------------------------- |
| Priority      | P1                                                          |
| Type          | Smoke                                                       |
| Automation    | ✅ `cypress/e2e/product.cy.js` — "displays product details" |
| Preconditions | The home page is open                                       |

| #   | Action                                       | Expected result           |
| --- | -------------------------------------------- | ------------------------- |
| 1   | Click the first `[data-test="product-name"]` | The product page opens    |
| 2   | Check the URL                                | It contains `/product`    |
| 3   | Check `h1` and `[data-test="add-to-cart"]`   | Both elements are visible |

**Expected result:** the product page opens and the title and add-to-cart button
are displayed.

---

### PRD-02 — Product page data completeness

| Field         | Value                    |
| ------------- | ------------------------ |
| Priority      | P2                       |
| Type          | Functional / UI          |
| Automation    | ❌                       |
| Preconditions | Any product page is open |

| #   | Action                          | Expected result                       |
| --- | ------------------------------- | ------------------------------------- |
| 1   | Check that a price is displayed | A `$XX.XX` price greater than 0       |
| 2   | Check the description           | Non-empty text                        |
| 3   | Check the image                 | Loaded (naturalWidth > 0, not broken) |
| 4   | Check SKU/brand (if displayed)  | Values are filled in                  |

**Expected result:** the page contains a title, price, description, image and an
"Add to cart" button; none of them is empty or a placeholder.

---

### PRD-03 — Navigation back to the catalog

| Field         | Value                  |
| ------------- | ---------------------- |
| Priority      | P3                     |
| Type          | Navigation             |
| Automation    | ❌                     |
| Preconditions | A product page is open |

| #   | Action                         | Expected result             |
| --- | ------------------------------ | --------------------------- |
| 1   | Click "Home" in the navigation | Returns to `/`              |
| 2   | Check the product list         | The catalog is displayed    |
| 3   | Press browser "Back"           | Returns to the product page |

**Expected result:** navigation works in both directions and browser history is
not broken.

---

### PRD-04 — Changing the quantity before adding to the cart

| Field         | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| Priority      | P2                                                               |
| Type          | Functional                                                       |
| Automation    | ❌                                                               |
| Preconditions | The product page has a quantity field (`[data-test="quantity"]`) |

| #   | Action                  | Expected result                  |
| --- | ----------------------- | -------------------------------- |
| 1   | Set the quantity to `3` | The field shows 3                |
| 2   | Click "Add to cart"     | The product is added             |
| 3   | Open the cart           | The product row has quantity = 3 |

**Expected result:** the specified quantity is added to the cart and the line
total equals price × quantity. If there is no quantity field, the case is marked
`N/A` and replaced by adding two units from the cart page (CART-03).

---

## 6. Cart

### CART-01 — Add a product to the cart

| Field         | Value                                                               |
| ------------- | ------------------------------------------------------------------- |
| Priority      | P1                                                                  |
| Type          | Smoke                                                               |
| Automation    | ✅ `cypress/e2e/cart.cy.js` — "adds a product to the shopping cart" |
| Preconditions | The home page is open                                               |

| #   | Action                            | Expected result                        |
| --- | --------------------------------- | -------------------------------------- |
| 1   | Open the first product            | The product page opens                 |
| 2   | Check `[data-test="add-to-cart"]` | Visible and enabled                    |
| 3   | Click the button                  | The add-to-cart request is sent        |
| 4   | Check the confirmation            | "Product added to shopping cart" shows |

**Expected result:** the product is in the cart, a success message is shown, and
the header cart counter increased.

---

### CART-02 — Add two different products

| Field         | Value             |
| ------------- | ----------------- |
| Priority      | P2                |
| Type          | Functional        |
| Automation    | ❌                |
| Preconditions | The cart is empty |

| #   | Action                                   | Expected result               |
| --- | ---------------------------------------- | ----------------------------- |
| 1   | Add the first product from the catalog   | The product is in the cart    |
| 2   | Go back to the catalog, add a second one | Both products are in the cart |
| 3   | Open the cart                            | Two rows with different names |

**Expected result:** the cart has 2 rows, the counter is 2, and the total equals
the sum of both products.

---

### CART-03 — Update the quantity in the cart

| Field         | Value               |
| ------------- | ------------------- |
| Priority      | P2                  |
| Type          | Functional          |
| Automation    | ❌                  |
| Preconditions | The cart has 1 item |

| #   | Action                     | Expected result                  |
| --- | -------------------------- | -------------------------------- |
| 1   | Open the cart              | The product row has quantity = 1 |
| 2   | Increase the quantity to 3 | Quantity = 3                     |
| 3   | Check the line total       | Equals price × 3                 |
| 4   | Check the grand total      | Updated accordingly              |

**Expected result:** the recalculation happens without a page reload, the header
counter is 3, and the total is correct.

---

### CART-04 — Remove a product from the cart

| Field         | Value                  |
| ------------- | ---------------------- |
| Priority      | P2                     |
| Type          | Functional             |
| Automation    | ❌                     |
| Preconditions | The cart has ≥ 2 items |

| #   | Action                          | Expected result     |
| --- | ------------------------------- | ------------------- |
| 1   | Open the cart                   | Two rows            |
| 2   | Click "Remove" on the first row | The row disappears  |
| 3   | Check the cart                  | One product remains |

**Expected result:** the removed product does not come back after a refresh, and
the counter and total are recalculated.

---

### CART-05 — Empty cart

| Field         | Value                           |
| ------------- | ------------------------------- |
| Priority      | P2                              |
| Type          | UI                              |
| Automation    | ❌                              |
| Preconditions | The cart is empty (new session) |

| #   | Action                    | Expected result                      |
| --- | ------------------------- | ------------------------------------ |
| 1   | Open the cart page        | An empty state / message is shown    |
| 2   | Check the checkout button | Disabled, or leads to the empty cart |

**Expected result:** a proper empty state is shown (e.g. "The cart is empty"),
checkout does not start, and there are no console errors.

---

### CART-06 — Cart persists after a page reload

| Field         | Value                 |
| ------------- | --------------------- |
| Priority      | P2                    |
| Type          | Persistence           |
| Automation    | ❌                    |
| Preconditions | The cart has ≥ 1 item |

| #   | Action               | Expected result            |
| --- | -------------------- | -------------------------- |
| 1   | Reload the page (F5) | The page reloads           |
| 2   | Open the cart        | The product is still there |

**Expected result:** the cart contents survive a reload (local storage/session)
and the header counter is correct.

---

### CART-07 — Header cart counter

| Field         | Value             |
| ------------- | ----------------- |
| Priority      | P3                |
| Type          | UI                |
| Automation    | ❌                |
| Preconditions | The cart is empty |

| #   | Action                     | Expected result |
| --- | -------------------------- | --------------- |
| 1   | Check the cart counter     | 0 or hidden     |
| 2   | Add 1 product              | Counter = 1     |
| 3   | Add the same product again | Counter = 2     |
| 4   | Remove all products        | Counter = 0     |

**Expected result:** the counter always matches the actual number of units in the
cart.

---

## 7. Checkout (E2E)

### E2E-01 — Full path: search → cart → place an order

| Field         | Value                                                                       |
| ------------- | --------------------------------------------------------------------------- |
| Priority      | P1                                                                          |
| Type          | E2E                                                                         |
| Automation    | ❌                                                                          |
| Preconditions | A valid account exists; the "Claw Hammer" product exists; the cart is empty |

| #   | Action                                                                                        | Expected result                                    |
| --- | --------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 1   | Search for `Claw Hammer`, open the product page                                               | The product page opens                             |
| 2   | Click "Add to cart"                                                                           | The product is in the cart                         |
| 3   | Open the cart                                                                                 | 1 row, total > 0                                   |
| 4   | Click "Proceed to checkout"                                                                   | The Sign in step (or Billing if already signed in) |
| 5   | Sign in with valid credentials (if prompted)                                                  | The Billing address step                           |
| 6   | Fill in the required address fields (country, postal code, house number, street, city, state) | The fields are filled                              |
| 7   | Click "Proceed"                                                                               | The Payment step                                   |
| 8   | Select "Cash on Delivery" and click "Finish"                                                  | The order is created                               |

**Expected result:** a payment/order confirmation with an invoice number is shown;
the cart is emptied; the order is available under `/account/invoices`.

---

### E2E-02 — Required field validation on the address step

| Field         | Value                                           |
| ------------- | ----------------------------------------------- |
| Priority      | P2                                              |
| Type          | Validation / Negative                           |
| Automation    | ❌                                              |
| Preconditions | The cart has 1 item; the Sign in step is passed |

| #   | Action                                             | Expected result                    |
| --- | -------------------------------------------------- | ---------------------------------- |
| 1   | Leave the fields empty on the Billing address step | The fields are empty               |
| 2   | Click "Proceed"                                    | The transition is blocked          |
| 3   | Check the messages                                 | Validation for each required field |
| 4   | Fill in all fields correctly and click "Proceed"   | The Payment step is opened         |

**Expected result:** payment is impossible without the required fields, the
validation messages are clear, and the step passes once the data is corrected.

---

## 8. Known issues and gaps

1. **The cart contents are not verified.** `CART-01` only checks the confirmation
   message, not the cart row. A product-row assertion should be added.
2. **There is no negative/validation case for checkout** — the highest-risk part
   of the application after search.
3. **The public demo is behind Cloudflare.** CI cannot target
   `practicesoftwaretesting.com` (403 for GitHub-hosted runners), so the checkout
   E2E cases must run against the local application from `docker-compose.ci.yml`
   (`BASE_URL=http://localhost:4200`).

## 9. What to automate next

1. `AUTH-03`, `AUTH-04`, `AUTH-05` — cheap, fast, and they cover the negative
   login path using the existing `LoginPage`.
2. `CART-05`, `CART-06`, `CART-07` — no new page objects needed, only cart
   selectors.
3. `E2E-01` — the main business scenario; requires a new `CheckoutPage`.
4. `E2E-02` — once `CheckoutPage` is stable.
