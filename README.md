# SauceDemo UI Test Automation

This is an automated UI test project for [SauceDemo](https://www.saucedemo.com/). It is built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** design pattern. TypeScript was chosen for this project primarily for its ease of use as Playwright is natively built with it.

## Test Scenarios Overview (8 Test Cases)

| ID    | Test Case                      | Description                                                                       |
| :---- | :----------------------------- | :-------------------------------------------------------------------------------- |
| **1** | Successful Login               | Valid credentials (`standard_user`) successfully navigate to the inventory page.  |
| **2** | Invalid Credentials            | Displays appropriate error message when logging in with invalid credentials.      |
| **3** | Locked Out User                | Verifies error message displayed when account is locked (`locked_out_user`).      |
| **4** | Sort Products Low to High      | Sorts products by price ascending and validates numerical order.                  |
| **5** | Add, Verify & Remove Cart Item | Adds item, verifies name and price in cart, and removes it from cart.             |
| **6** | Multi-Item Cart Counter        | Adds multiple items and validates cart badge counter accurately reflects count.   |
| **7** | E2E Checkout Flow              | Completes full purchase from cart to order confirmation header verification.      |
| **8** | Checkout Missing Fields        | Validates error message and prevents continuation when mandatory info is missing. |

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/feyzaozlu/saucedemo-playwright.git
cd saucedemo-playwright
npm install
```

Install Playwright browsers (Chromium):

```bash
npx playwright install chromium
```

## Running Tests

### Run all tests in headless mode:

```bash
npx playwright test
```

### Run tests in headed mode (visible browser):

```bash
npx playwright test --headed
```

### Run tests in interactive UI mode:

```bash
npx playwright test --ui
```

## Test Reports & Debugging

Playwright automatically generates an HTML report after test execution.

To open and inspect the test report:

```bash
npx playwright show-report
```

## Example Test Run Reports

Two pre-generated test execution reports are included directly in this repository:

1. **Successful Execution (All Passing):**
   - **Interactive HTML Report:** Open [`example-test-report/passed_run/index.html`](./example-test-report/passed_run/index.html) in any browser to view the clean 8/8 passed suite.
   - **JUnit XML Report:** Located at [`example-test-report/passed_run/results.xml`](./example-test-report/passed_run/results.xml).

2. **Failure Analysis & Debugging Evidence (`failed_run`):**
   - **Interactive HTML Report with Screenshot:** Open [`example-test-report/failed_run/index.html`](./example-test-report/failed_run/index.html).
   - **Failure Explanation:** Simulates a regression where an error message was expected to be `"First Name cannot be empty"`, but the application rendered `"Error: First Name is required"`.
   - **Captured Evidence:** Playwright instantly captured a full-page failure screenshot [`example-test-report/failed_run/failure-screenshot.png`](./example-test-report/failed_run/failure-screenshot.png).

## CI/CD Pipeline

A GitHub Actions workflow is configured in `.github/workflows/playwright.yml`.

- **Trigger:** Runs automatically on every `push` and `pull_request` to `main`.
- **Execution:** Installs dependencies, sets up Chromium, and executes the entire test suite.
- **Artifacts:** The complete HTML report (`playwright-report/`) is uploaded as a downloadable build artifact (retained for 14 days).

## Design & Architectural Decisions

1. **Page Object Model (POM):**
   - Web element selectors and actions are strictly isolated within page classes (`tests/pages/`).
   - Test files contain only user flow logic and assertions, making tests readable and easy to maintain.

2. **Session Independence:**
   - Every test runs in its own isolated browser context (`test.beforeEach` initializes a clean session).
   - Tests do not share cart state or cookies, allowing fully parallel and order independent execution.

3. **Retry Policy:**
   - Local Runs (0 retries): Fails immediately to provide fast developer feedback for debugging.
   - CI / GitHub Actions (2 retries): Retries failed tests up to 2 times to prevent pipeline failures caused by network latency (preventing flakiness).

## CI Execution Limitations

- Headless Only: Tests execute in headless mode on Ubuntu GitHub runners since CI environments do not provide a physical display server.

- Shared Runner Resources: Shared virtual machine resources on GitHub Actions may introduce minor network/CPU latency. This is handled by our retry policy.

This test covers critical business risks across user authentication, cart integrity, and checkout validation flows. Real payment processing, backend databases, and non-functional tests are excluded since SauceDemo is a front-end mock application. Potential test flakiness from external network latency or state leakage is mitigated through isolated browser contexts, dynamic state-based assertions, and CI retry policies.
