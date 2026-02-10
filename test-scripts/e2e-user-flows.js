/**
 * TrustVerify End-to-End User Flow Tests
 * Date: June 21, 2025
 * Version: 1.0.0
 * Tests complete user journeys and workflows
 */

import { test, expect } from '@playwright/test';

// Test Complete User Registration and Onboarding Flow
test.describe('User Onboarding Flow', () => {
  test('complete new user registration and setup', async ({ page }) => {
    // Step 1: Navigate to homepage
    await page.goto('/');
    expect(await page.title()).toBe('TrustVerify - Secure Transaction & Identity Verification Platform');
    
    // Step 2: Click "Get Started Free" from hero section
    await page.click('text=Get Started Free');
    await expect(page).toHaveURL('/auth');
    
    // Step 3: Complete registration form
    await page.click('text=Create Account');
    await page.fill('[data-testid="username-input"]', 'newuser_' + Date.now());
    await page.fill('[data-testid="email-input"]', `test_${Date.now()}@example.com`);
    await page.fill('[data-testid="password-input"]', 'SecurePassword123!');
    await page.click('[data-testid="create-account-button"]');
    
    // Step 4: Verify successful registration and redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Welcome to TrustVerify')).toBeVisible();
    
    // Step 5: Complete initial profile setup
    await page.click('text=Complete Profile');
    await page.fill('[data-testid="first-name"]', 'John');
    await page.fill('[data-testid="last-name"]', 'Doe');
    await page.click('[data-testid="save-profile"]');
    
    // Step 6: Verify dashboard shows correct initial state
    await expect(page.locator('[data-testid="trust-score"]')).toContainText('0');
    await expect(page.locator('[data-testid="verification-status"]')).toContainText('Not Verified');
    await expect(page.locator('[data-testid="total-transactions"]')).toContainText('0');
  });
});

// Test Complete Transaction Creation and Management Flow
test.describe('Transaction Management Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as demo user
    await page.goto('/auth');
    await page.fill('[data-testid="username-input"]', 'demo_user');
    await page.fill('[data-testid="password-input"]', 'TrustVerify2024!');
    await page.click('[data-testid="login-button"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('create, monitor, and complete transaction', async ({ page }) => {
    // Step 1: Navigate to transactions page
    await page.click('text=Transactions');
    await expect(page).toHaveURL('/transactions');
    
    // Step 2: Create new transaction
    await page.click('[data-testid="new-transaction-button"]');
    await expect(page.locator('[data-testid="transaction-modal"]')).toBeVisible();
    
    // Step 3: Fill transaction details
    await page.fill('[data-testid="transaction-title"]', 'Website Development Project');
    await page.fill('[data-testid="transaction-amount"]', '2500.00');
    await page.fill('[data-testid="recipient-email"]', 'developer@example.com');
    await page.selectOption('[data-testid="category-select"]', 'Web Development');
    await page.fill('[data-testid="transaction-description"]', 'Complete e-commerce website with payment integration');
    
    // Step 4: Submit transaction
    await page.click('[data-testid="create-transaction-button"]');
    await expect(page.locator('text=Transaction created successfully')).toBeVisible();
    
    // Step 5: Verify transaction appears in list
    await expect(page.locator('text=Website Development Project')).toBeVisible();
    await expect(page.locator('text=$2,500.00')).toBeVisible();
    await expect(page.locator('[data-testid="status-pending"]')).toBeVisible();
    
    // Step 6: Access transaction messages
    await page.click('[data-testid="transaction-messages-button"]');
    await expect(page.locator('[data-testid="messages-panel"]')).toBeVisible();
    
    // Step 7: Send message
    await page.fill('[data-testid="message-input"]', 'Hello, I have started working on your project.');
    await page.click('[data-testid="send-message-button"]');
    await expect(page.locator('text=Hello, I have started working')).toBeVisible();
    
    // Step 8: Update transaction status
    await page.click('[data-testid="mark-complete-button"]');
    await page.click('[data-testid="confirm-complete"]');
    await expect(page.locator('[data-testid="status-completed"]')).toBeVisible();
  });

  test('handle transaction dispute', async ({ page }) => {
    // Navigate to transactions
    await page.goto('/transactions');
    
    // Select a transaction
    await page.click('[data-testid="transaction-item"]:first-child');
    
    // Raise dispute
    await page.click('[data-testid="raise-dispute-button"]');
    await page.fill('[data-testid="dispute-reason"]', 'Work not completed as agreed');
    await page.fill('[data-testid="dispute-details"]', 'The delivered work does not match the requirements outlined in our agreement.');
    await page.click('[data-testid="submit-dispute"]');
    
    // Verify dispute created
    await expect(page.locator('text=Dispute submitted successfully')).toBeVisible();
    await expect(page.locator('[data-testid="status-disputed"]')).toBeVisible();
  });
});

// Test Identity Verification Flow
test.describe('Identity Verification Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth');
    await page.fill('[data-testid="username-input"]', 'demo_user');
    await page.fill('[data-testid="password-input"]', 'TrustVerify2024!');
    await page.click('[data-testid="login-button"]');
  });

  test('complete identity verification process', async ({ page }) => {
    // Step 1: Navigate to verification page
    await page.click('text=Verify Identity');
    await expect(page).toHaveURL('/verification');
    
    // Step 2: Start verification process
    await page.click('[data-testid="start-verification-button"]');
    
    // Step 3: Fill personal information
    await page.fill('[data-testid="first-name"]', 'John');
    await page.fill('[data-testid="last-name"]', 'Doe');
    await page.fill('[data-testid="date-of-birth"]', '1990-01-01');
    await page.selectOption('[data-testid="document-type"]', 'passport');
    await page.fill('[data-testid="document-number"]', 'P123456789');
    await page.fill('[data-testid="address"]', '123 Main Street');
    await page.fill('[data-testid="city"]', 'New York');
    await page.fill('[data-testid="country"]', 'United States');
    await page.fill('[data-testid="postal-code"]', '10001');
    
    await page.click('[data-testid="continue-button"]');
    
    // Step 4: Upload documents
    await page.setInputFiles('[data-testid="front-id-upload"]', 'test-files/sample-id-front.jpg');
    await expect(page.locator('text=sample-id-front.jpg')).toBeVisible();
    
    await page.click('[data-testid="continue-button"]');
    
    // Step 5: Upload selfie
    await page.setInputFiles('[data-testid="selfie-upload"]', 'test-files/sample-selfie.jpg');
    await expect(page.locator('text=sample-selfie.jpg')).toBeVisible();
    
    // Step 6: Submit verification
    await page.click('[data-testid="submit-verification"]');
    
    // Step 7: Verify success message
    await expect(page.locator('text=Verification Submitted')).toBeVisible();
    await expect(page.locator('text=Our team will review your documents within 24-48 hours')).toBeVisible();
  });
});

// Test Developer Portal Flow
test.describe('Developer Portal Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth');
    await page.fill('[data-testid="username-input"]', 'demo_user');
    await page.fill('[data-testid="password-input"]', 'TrustVerify2024!');
    await page.click('[data-testid="login-button"]');
  });

  test('create developer account and manage API keys', async ({ page }) => {
    // Step 1: Navigate to developer portal
    await page.click('text=Developer');
    await expect(page).toHaveURL('/developer-portal');
    
    // Step 2: Create developer account
    await page.fill('[data-testid="company-name"]', 'Test Company Inc.');
    await page.fill('[data-testid="website"]', 'https://testcompany.com');
    await page.fill('[data-testid="description"]', 'We build fraud prevention solutions for e-commerce platforms.');
    await page.click('[data-testid="create-developer-account"]');
    
    // Step 3: Verify account creation
    await expect(page.locator('text=Developer account created')).toBeVisible();
    await expect(page.locator('[data-testid="account-status"]')).toContainText('Pending Review');
    
    // Step 4: Navigate to API Keys tab
    await page.click('[data-testid="api-keys-tab"]');
    
    // Step 5: Create API key
    await page.click('[data-testid="create-api-key"]');
    await page.fill('[data-testid="api-key-name"]', 'Production API Key');
    await page.check('[data-testid="permission-transactions"]');
    await page.check('[data-testid="permission-verification"]');
    await page.click('[data-testid="create-key-submit"]');
    
    // Step 6: Verify API key creation
    await expect(page.locator('text=API key created')).toBeVisible();
    await expect(page.locator('[data-testid="api-key-display"]')).toBeVisible();
    
    // Step 7: Copy API key
    await page.click('[data-testid="copy-api-key"]');
    await expect(page.locator('text=Copied to clipboard')).toBeVisible();
    
    // Step 8: View usage statistics
    await page.click('[data-testid="usage-tab"]');
    await expect(page.locator('[data-testid="monthly-calls"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-rate"]')).toBeVisible();
  });
});

// Test Scam Reporting Flow
test.describe('Scam Reporting Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth');
    await page.fill('[data-testid="username-input"]', 'demo_user');
    await page.fill('[data-testid="password-input"]', 'TrustVerify2024!');
    await page.click('[data-testid="login-button"]');
  });

  test('report and search scam reports', async ({ page }) => {
    // Step 1: Navigate to scam reports
    await page.click('text=Scam Reports');
    await expect(page).toHaveURL('/scam-reports');
    
    // Step 2: Create new scam report
    await page.click('[data-testid="report-scam-button"]');
    await page.fill('[data-testid="scammer-contact"]', 'scammer@fake-email.com');
    await page.selectOption('[data-testid="scam-type"]', 'fake_seller');
    await page.fill('[data-testid="scam-description"]', 'Seller took payment but never delivered the product. Communication stopped after payment.');
    await page.fill('[data-testid="amount-lost"]', '150.00');
    await page.click('[data-testid="submit-report"]');
    
    // Step 3: Verify report submission
    await expect(page.locator('text=Scam report submitted')).toBeVisible();
    
    // Step 4: Search for scam reports
    await page.fill('[data-testid="search-scams"]', 'scammer@fake-email.com');
    await page.click('[data-testid="search-button"]');
    
    // Step 5: Verify search results
    await expect(page.locator('text=scammer@fake-email.com')).toBeVisible();
    await expect(page.locator('text=fake_seller')).toBeVisible();
  });
});

// Test Admin Dashboard Flow (if admin user)
test.describe('Admin Dashboard Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin user
    await page.goto('/auth');
    await page.fill('[data-testid="username-input"]', 'admin_user');
    await page.fill('[data-testid="password-input"]', 'AdminPassword123!');
    await page.click('[data-testid="login-button"]');
  });

  test('manage KYC verifications and disputes', async ({ page }) => {
    // Step 1: Navigate to admin dashboard
    await page.click('text=Admin');
    await expect(page).toHaveURL('/admin-dashboard');
    
    // Step 2: Review pending KYC verifications
    await page.click('[data-testid="pending-kyc-tab"]');
    await expect(page.locator('[data-testid="kyc-pending-list"]')).toBeVisible();
    
    // Step 3: Approve a KYC verification
    await page.click('[data-testid="kyc-review-button"]:first-child');
    await page.fill('[data-testid="review-notes"]', 'Documents verified. Identity confirmed.');
    await page.click('[data-testid="approve-kyc"]');
    
    // Step 4: Verify approval
    await expect(page.locator('text=KYC verification approved')).toBeVisible();
    
    // Step 5: Handle disputes
    await page.click('[data-testid="disputes-tab"]');
    await page.click('[data-testid="dispute-review"]:first-child');
    await page.fill('[data-testid="resolution-notes"]', 'Reviewed evidence. Refund approved.');
    await page.selectOption('[data-testid="resolution-action"]', 'refund_buyer');
    await page.click('[data-testid="resolve-dispute"]');
    
    // Step 6: Verify dispute resolution
    await expect(page.locator('text=Dispute resolved successfully')).toBeVisible();
  });
});

// Test Error Handling and Edge Cases
test.describe('Error Handling and Edge Cases', () => {
  test('handle network errors gracefully', async ({ page }) => {
    // Simulate network failure
    await page.route('**/api/**', route => route.abort());
    
    await page.goto('/auth');
    await page.fill('[data-testid="username-input"]', 'demo_user');
    await page.fill('[data-testid="password-input"]', 'TrustVerify2024!');
    await page.click('[data-testid="login-button"]');
    
    // Should show network error message
    await expect(page.locator('text=Network error. Please try again.')).toBeVisible();
  });

  test('handle session expiration', async ({ page }) => {
    // Login first
    await page.goto('/auth');
    await page.fill('[data-testid="username-input"]', 'demo_user');
    await page.fill('[data-testid="password-input"]', 'TrustVerify2024!');
    await page.click('[data-testid="login-button"]');
    
    // Clear session cookie
    await page.context().clearCookies();
    
    // Try to access protected route
    await page.goto('/dashboard');
    
    // Should redirect to auth page
    await expect(page).toHaveURL('/auth');
    await expect(page.locator('text=Session expired. Please log in again.')).toBeVisible();
  });

  test('handle form validation errors', async ({ page }) => {
    await page.goto('/auth');
    await page.click('text=Create Account');
    
    // Submit empty form
    await page.click('[data-testid="create-account-button"]');
    
    // Should show validation errors
    await expect(page.locator('text=Username is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });
});

// Test Mobile Responsiveness
test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE viewport

  test('mobile navigation and interactions', async ({ page }) => {
    await page.goto('/auth');
    await page.fill('[data-testid="username-input"]', 'demo_user');
    await page.fill('[data-testid="password-input"]', 'TrustVerify2024!');
    await page.click('[data-testid="login-button"]');
    
    // Test mobile menu
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    
    // Navigate using mobile menu
    await page.click('text=Transactions');
    await expect(page).toHaveURL('/transactions');
    
    // Test mobile form layout
    await page.click('[data-testid="new-transaction-button"]');
    const modal = page.locator('[data-testid="transaction-modal"]');
    await expect(modal).toHaveCSS('width', '100%');
  });
});

// Performance Tests
test.describe('Performance Tests', () => {
  test('page load performance', async ({ page }) => {
    // Measure page load time
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check Core Web Vitals
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          resolve(entries);
        }).observe({ entryTypes: ['navigation'] });
      });
    });
    
    expect(metrics).toBeDefined();
  });
});