import { test, expect } from '@playwright/test';

test('02 Remove Product ก่อน Checkout', async ({ page }) => {
    // =====================================================
    // Login
    // =====================================================
    await page.goto('/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory\.html/);

    // =====================================================
    // Add Product
    // =====================================================
    await page
        .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click();
    await page
        .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
        .click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Cart
    // =====================================================
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart\.html/);

    //Remove Product
    await page
        .locator('[data-test="remove-sauce-labs-bike-light"]')
        .click();

    // =====================================================

    // =====================================================
    // Checkout
    // =====================================================
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

});