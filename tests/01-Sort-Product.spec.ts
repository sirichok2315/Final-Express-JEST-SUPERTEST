import { test, expect } from '@playwright/test';

test('01 Sort Product', async ({ page }) => {
    // =====================================================
    // Login
    // =====================================================
    await page.goto('/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory\.html/);

    // เลือกเรียงลำดับสินค้า: ราคาต่ำไปสูง (Price: Low to High)
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    // 1. ดึงข้อความราคาสินค้าทั้งหมดในหน้าจอเก็บไว้ในอาเรย์ (Array)
    const priceElements = await page.locator('.inventory_item_price').allInnerTexts();

    // 2. แปลงข้อความราคา (เช่น "$7.99") ให้เป็นตัวเลข (Number)
    const prices = priceElements.map(price => parseFloat(price.replace('$', '')));

    // 3. วนลูปเช็คว่า ราคาตัวที่ i ต้องน้อยกว่าหรือเท่ากับ ราคาตัวถัดไป (i + 1)
    for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }

});