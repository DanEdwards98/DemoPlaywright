This workspace is organized as a progressive learning path with 8 lessons:

### Lesson 1: Basic Tests (`tests/01-basics.spec.ts`)

- Writing your first Playwright test
- Page navigation
- Basic assertions
- Selecting elements
- Checking element properties

### Lesson 2: Selectors and Locators (`tests/02-selectors.spec.ts`)

- CSS selectors
- Text-based selectors
- Role-based selectors (accessibility-first!)
- XPath selectors
- Combining and filtering locators

### Lesson 3: Interactions and Waits (`tests/03-interactions.spec.ts`)

- Clicking elements
- Typing and filling text
- Waiting for elements to appear
- Navigation waits
- Handling dropdowns, checkboxes, radio buttons
- Hover interactions
- Scroll to element

### Lesson 4: Page Object Model Pattern (`tests/04-page-objects.spec.ts`)

- Encapsulating page interactions
- Creating reusable page objects
- Maintaining test code
- Benefits of page object model

### Lesson 5: Test Utilities and Data (`tests/05-utilities.spec.ts`)

- Centralizing test data
- Creating helper functions
- Reducing code duplication
- Best practices for test organization

### Lesson 6: Assertions (`tests/06-assertions.spec.ts`)

- Locator assertions (visibility, state)
- Text content assertions
- Attribute assertions
- CSS assertions
- Page and URL assertions
- Soft assertions
- Custom assertion messages

### Lesson 7: Fixtures and Hooks (`tests/07-fixtures.spec.ts`)

- Custom test fixtures
- beforeEach and afterEach hooks
- Test setup and teardown
- Test lifecycle management

### Lesson 8: Best Practices (`tests/08-best-practices.spec.ts`)

- Test independence
- Naming conventions
- Avoiding flaky tests
- Meaningful selectors
- Proper error handling

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:

   ```bash
   cd c:\Users\dan.edwards\DemoPlaywright
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Playwright browsers (required for testing):
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

### Run all tests

```bash
npm run test
```

### Run tests in headed mode (see browser)

```bash
npm run test:headed
```

### Run specific test file

```bash
npm run test -- tests/01-basics.spec.ts
```

### Run tests in specific browser

```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Run tests across all browsers

```bash
npm run test:all
```

### Run in debug mode

```bash
npm run test:debug
```

### Run in UI mode (interactive)

```bash
npm run test:ui
```

### View HTML report

```bash
npm run report
```

### Generate test code with Codegen

```bash
npm run codegen
```

## 📁 Project Structure

```
DemoPlaywright/
├── tests/                  # Test files (lessons 1-8)
│   ├── 01-basics.spec.ts
│   ├── 02-selectors.spec.ts
│   ├── 03-interactions.spec.ts
│   ├── 04-page-objects.spec.ts
│   ├── 05-utilities.spec.ts
│   ├── 06-assertions.spec.ts
│   ├── 07-fixtures.spec.ts
│   └── 08-best-practices.spec.ts
│
├── pages/                  # Page Object Models
│   ├── HomePage.ts        # Example page object
│   └── LoginPage.ts       # Example page object
│
├── fixtures/              # Test fixtures and setup
│   └── testBase.ts        # Custom test fixtures
│
├── utils/                 # Utility functions
│   ├── testData.ts        # Centralized test data
│   └── testHelpers.ts     # Helper functions
│
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies
└── README.md              # This file
```

## 📖 Key Concepts

### Page Object Model

Encapsulate all page interactions in classes:

```typescript
export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async search(query: string) {
    await this.page.locator('[placeholder="Search"]').fill(query);
  }
}
```

### Test Fixtures

Provide reusable setup:

```typescript
export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});
```

### Test Data

Centralize test data in `utils/testData.ts`:

```typescript
export const TEST_USERS = {
  validUser: {
    email: "user@example.com",
    password: "Password123",
  },
};
```

### Selectors (Priority Order)

1. **Role-based** (best): `page.locator('role=button[name="Search"]')`
2. **Text-based** (good): `page.locator('button:has-text("Search")')`
3. **Attributes** (okay): `page.locator('input[type="text"]')`
4. **CSS** (fragile): `page.locator('section > button')`
5. **XPath** (avoid): `page.locator('xpath=//button')`

## 🎓 Teaching Tips

1. **Progressive Learning**: Start with Lesson 1, progress through in order
2. **Hands-On Practice**: Have students modify and extend the examples
3. **Real-World Sites**: Have them write tests for real websites
4. **Code Generation**: Use `npm run codegen` to reverse-engineer tests
5. **Debugging**: Use `npm run test:debug` to step through tests
6. **Visual Mode**: Use `npm run test:ui` for interactive learning

## 💡 Common Patterns

### Wait for Element to Appear

```typescript
const element = page.locator(".results");
await element.waitFor({ state: "visible", timeout: 5000 });
```

### Wait for Navigation

```typescript
await Promise.all([page.waitForNavigation(), page.click("a.logout")]);
```

### Fill Form and Submit

```typescript
await page.fill('input[type="email"]', "test@example.com");
await page.fill('input[type="password"]', "password");
await page.click('button[type="submit"]');
```

### Assert Text Present

```typescript
await expect(page).toContainText("Welcome");
```

## 🐛 Debugging Tips

1. **Use headed mode** to see what's happening:

   ```bash
   npm run test:headed
   ```

2. **Pause execution** in debug mode:

   ```bash
   npm run test:debug
   ```

3. **Take screenshots** on failure:

   ```typescript
   await page.screenshot({ path: "debug.png" });
   ```

4. **Get element details**:

   ```typescript
   const locator = page.locator("button");
   console.log(await locator.count());
   console.log(await locator.textContent());
   ```

5. **Use VS Code Debugger**:
   - Add breakpoints in your test
   - Run with `npm run test:debug`

## 📚 Additional Resources

- [Playwright Official Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Assertion Reference](https://playwright.dev/docs/test-assertions)
- [API Reference](https://playwright.dev/docs/api/class-page)

## ✅ Checklist for Students

- [ ] Update `playwright.config.ts` with your test application URL
- [ ] Run all tests successfully
- [ ] Write a test using each selector type
- [ ] Create a page object model
- [ ] Use test fixtures
- [ ] Add custom assertions
- [ ] Modify a test to use test data
- [ ] Run tests in multiple browsers
- [ ] View the HTML report
- [ ] Debug a test using debug mode
- [ ] Write tests for your application
- [ ] Use the Code Generator to create new tests

## 📖 Additional Setup Documentation

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for:

- Configuring tests for your application
- Using environment variables
- Testing multiple environments
- Troubleshooting common issues
- Using free test sites to practice
