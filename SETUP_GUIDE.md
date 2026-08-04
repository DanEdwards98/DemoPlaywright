# 🎓 Setting Up Your First Tests

## Quick Setup for Your App

### Option 1: Local Development Server

If your app runs locally on port 3000:

```typescript
baseURL: "http://localhost:3000";
```

Then in tests, just use:

```typescript
await page.goto("/"); // Goes to http://localhost:3000
await page.goto("/login"); // Goes to http://localhost:3000/login
```

### Option 2: Staging/Test Environment

For testing against a remote server:

```typescript
baseURL: "https://staging.myapp.com";
```

### Option 3: Multiple Environments

Use environment variables:

```typescript
// playwright.config.ts
const baseURL = process.env.BASE_URL || "http://localhost:3000";

export default defineConfig({
  use: {
    baseURL: baseURL,
  },
});
```

Then run tests with:

```bash
BASE_URL=https://staging.com npm run test
```

## Testing the Lessons

The lesson tests (01-basics through 08-best-practices) are now written to work with **any website** because they:

1. **Use generic selectors** - They look for common elements like `h1`, `button`, `a` instead of specific ones
2. **Handle missing elements gracefully** - They check if elements exist before asserting on them
3. **Use the baseURL** - They navigate with `await page.goto('/')` instead of hardcoded URLs

### Try it with a Real Site

For testing without setting up your own app, try these free test sites:

```typescript
// Option 1: Wikipedia
baseURL: "https://www.wikipedia.org";

// Option 2: GitHub
baseURL: "https://github.com";

// Option 3: Play with simple HTML
// Create a local test.html file and use:
baseURL: "file:///path/to/your/files";
```

## Example: Test Against GitHub

1. Update `playwright.config.ts`:

```typescript
use: {
  baseURL: 'https://github.com',
},
```

2. Run the tests:

```bash
npm run test -- tests/01-basics.spec.ts
```

The tests should pass because they look for generic elements that GitHub has!

## Environment Variables

Create a `.env` file in the project root:

```
BASE_URL=http://localhost:3000
```

Then update `playwright.config.ts`:

```typescript
import dotenv from "dotenv";
dotenv.config();

const baseURL = process.env.BASE_URL || "http://localhost:3000";

export default defineConfig({
  use: {
    baseURL: baseURL,
  },
});
```

Install dotenv:

```bash
npm install --save-dev dotenv
```

## Next Steps

1. **Update playwright.config.ts** with your test application URL
2. **Run the tests**: `npm run test`
3. **Check the results**: `npm run report`
4. **Adapt the lessons** to your specific application
5. **Create new tests** using the patterns from lessons 1-8

## Common Issues

### Tests Still Failing?

- Verify your `baseURL` is correct and accessible
- Check if the page is loading (use headed mode: `npm run test:headed`)
- Use debug mode to inspect: `npm run test:debug`
- View the HTML report: `npm run report`

### Selectors Not Working?

- The lessons use generic selectors that work on most sites
- For your app, use specific selectors (role-based preferred)
- Use Playwright Inspector: `npx playwright codegen YOUR_URL`

## Teaching Tips

When teaching students:

1. **Start with Lesson 1** - Make sure basic page navigation works
2. **Modify selectors together** - Show how to find elements on their app
3. **Test a real site first** - Use GitHub or Wikipedia to verify setup
4. **Then test their app** - Update baseURL and test their application

---

Ready to start? Update `playwright.config.ts` and run `npm run test`! 🚀
