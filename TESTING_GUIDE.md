# Testing Infrastructure Guide

## Overview

This guide provides instructions for setting up and running tests for the Olive-Edge e-commerce platform.

## Test Stack

- **Jest**: JavaScript testing framework
- **React Testing Library**: Component testing for React/Next.js
- **Playwright**: End-to-end browser testing
- **Supertest**: API endpoint testing (backend)

---

## Setup Instructions

### 1. Install Testing Dependencies

```bash
# Frontend testing
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom

# Backend testing
npm install --save-dev supertest

# E2E testing
npm install --save-dev @playwright/test

# TypeScript support
npm install --save-dev @types/jest ts-jest
```

### 2. Jest Configuration

Create `jest.config.js`:

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Path to your Next.js app
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom';
```

### 3. Update package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:api": "jest --testPathPattern=backend"
  }
}
```

---

## Testing Examples

### Frontend Component Testing

**Example: Button Component Test**

Create `src/components/__tests__/Button.test.tsx`:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct classes for variants', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass('bg-clinical-ink');
  });
});
```

### Context Provider Testing

**Example: AuthContext Test**

```typescript
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/features/auth';

describe('AuthContext', () => {
  it('provides authentication state', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('handles login correctly', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

### Utility Function Testing

**Example: Error Utils Test**

```typescript
import { getErrorMessage } from '@/lib/error-utils';

describe('getErrorMessage', () => {
  it('extracts message from error object', () => {
    const error = new Error('Test error');
    expect(getErrorMessage(error)).toBe('Test error');
  });

  it('handles axios error response', () => {
    const axiosError = {
      response: {
        data: {
          message: 'API Error'
        }
      }
    };
    expect(getErrorMessage(axiosError)).toBe('API Error');
  });

  it('returns fallback for unknown errors', () => {
    expect(getErrorMessage('string error')).toBe('An unexpected error occurred');
  });
});
```

---

## Backend API Testing

### Endpoint Testing with Supertest

Create `backend/tests/products.test.js`:

```javascript
import request from 'supertest';
import app from '../server.js';
import Product from '../models/productModel.js';

describe('Product API Endpoints', () => {
  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(res.body.products)).toBeTruthy();
    });

    it('should support pagination', async () => {
      const res = await request(app)
        .get('/api/products?page=1&limit=10')
        .expect(200);

      expect(res.body.page).toBe(1);
      expect(res.body.products.length).toBeLessThanOrEqual(10);
    });
  });

  describe('GET /api/products/search', () => {
    it('should search products by query', async () => {
      const res = await request(app)
        .get('/api/products/search?q=jacket')
        .expect(200);

      expect(res.body.products).toBeDefined();
    });

    it('should filter by category', async () => {
      const res = await request(app)
        .get('/api/products/search?category=Jackets')
        .expect(200);

      res.body.products.forEach(product => {
        expect(product.category).toBe('Jackets');
      });
    });
  });

  describe('POST /api/products/:id/reviews (Protected)', () => {
    it('should require authentication', async () => {
      await request(app)
        .post('/api/products/123/reviews')
        .send({ rating: 5, comment: 'Great!' })
        .expect(401);
    });
  });
});
```

---

## E2E Testing with Playwright

### Setup Playwright

```bash
npx playwright install
```

Create `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Example

Create `e2e/checkout-flow.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('complete purchase journey', async ({ page }) => {
    // Navigate to shop
    await page.goto('/shop');
    
    // Select product
    await page.getByText('TechWear Pro Jacket').click();
    await expect(page).toHaveURL(/\/product\//);
    
    // Add to cart
    await page.getByRole('button', { name: /add to cart/i }).click();
    await expect(page.getByText(/added to cart/i)).toBeVisible();
    
    // Go to cart
    await page.goto('/cart');
    await expect(page.getByText('TechWear Pro Jacket')).toBeVisible();
    
    // Proceed to checkout
    await page.getByRole('button', { name: /proceed to checkout/i }).click();
    
    // Fill shipping info (if not logged in)
    if (await page.getByText('Login').isVisible()) {
      await page.goto('/login?redirect=/shipping');
      // ... login flow
    }
    
    await page.fill('[name="address"]', '123 Test Street');
    await page.fill('[name="city"]', 'Mumbai');
    await page.fill('[name="postalCode"]', '400001');
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Verify order summary
    await expect(page).toHaveURL(/\/order/);
    await expect(page.getByText('TechWear Pro Jacket')).toBeVisible();
  });

  test('cart persistence', async ({ page }) => {
    // Add item to cart
    await page.goto('/shop');
    await page.getByText('First Product').click();
    await page.getByRole('button', { name: /add to cart/i }).click();
    
    // Refresh page
    await page.reload();
    
    // Verify cart still has item
    await page.goto('/cart');
    await expect(page.getByText('First Product')).toBeVisible();
  });
});
```

---

## Test Coverage

### Running Coverage Report

```bash
npm run test:coverage
```

### Coverage Goals

| Category | Target |
|----------|--------|
| Statements | 70% |
| Branches | 70% |
| Functions | 70% |
| Lines | 70% |

### Priority Areas for Coverage

1. **Authentication Context** (auth/index.tsx)
2. **Cart Context** (cart/index.tsx)
3. **Wishlist Context** (wishlist/index.tsx)
4. **API Utilities** (lib/api.ts)
5. **Error Handling** (lib/error-utils.ts)
6. **Product Controllers** (backend/controllers/productController.js)
7. **Order Controllers** (backend/controllers/orderController.js)

---

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run unit tests
        run: npm test -- --coverage
        
      - name: Run E2E tests
        run: npm run test:e2e
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## Best Practices

### 1. Test Organization

```
src/
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx
├── features/
│   ├── auth/
│   │   ├── index.tsx
│   │   └── __tests__/
│   │       └── AuthContext.test.tsx
└── lib/
    ├── api.ts
    └── __tests__/
        └── api.test.ts
```

### 2. Test Naming Convention

```typescript
describe('ComponentOrFunction', () => {
  it('should do something specific', () => {
    // Test implementation
  });

  it('handles edge case correctly', () => {
    // Test implementation
  });
});
```

### 3. Mocking External Dependencies

```typescript
// Mock API calls
jest.mock('@/lib/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));
```

### 4. Snapshot Testing (Use Sparingly)

```typescript
import { render } from '@testing-library/react';
import ProductCard from '../ProductCard';

it('matches snapshot', () => {
  const { container } = render(
    <ProductCard product={mockProduct} />
  );
  expect(container).toMatchSnapshot();
});
```

---

## Quick Start Checklist

- [ ] Install testing dependencies
- [ ] Create jest.config.js and jest.setup.js
- [ ] Add test scripts to package.json
- [ ] Write tests for utility functions
- [ ] Write tests for context providers
- [ ] Write tests for reusable components
- [ ] Write API endpoint tests with Supertest
- [ ] Set up Playwright for E2E tests
- [ ] Configure CI/CD pipeline
- [ ] Achieve 70% code coverage
- [ ] Document test patterns for team

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Next.js Testing Guide](https://nextjs.org/docs/app/building-your-application/testing)
