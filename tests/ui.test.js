const { test, expect } = require('@playwright/test');

let uniqueItemName;

test.describe('Item Manager UI Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/');
    });

    test('Add a new item', async ({ page }) => {

        uniqueItemName = 'Test Item ' + new Date().getTime();
        
        await page.fill('#itemName', uniqueItemName);
        await page.fill('#itemDescription', 'This is a test description');
        await page.click('button:has-text("Add Item")');

        await page.waitForSelector(`.item:has-text("${uniqueItemName}")`);

        const itemText = await page.textContent(`.item:has-text("${uniqueItemName}")`);
        expect(itemText).toContain(uniqueItemName);
    });

    test('Delete an item', async ({ page }) => {
        if (!uniqueItemName) {
            throw new Error('No unique item name available for deletion');
        }

        await page.waitForSelector(`.item:has-text("${uniqueItemName}")`);

        await page.click(`.item:has-text("${uniqueItemName}") button:has-text("Delete")`);

        await page.waitForSelector(`.item:has-text("${uniqueItemName}")`, { state: 'detached' });

        const itemExists = await page.$(`.item:has-text("${uniqueItemName}")`);
        expect(itemExists).toBeNull();
    });

    test('Verify item list updates', async ({ page }) => {
        const existingItems = await page.$$('.item');
        
        await page.fill('#itemName', 'Updated Test Item');
        await page.fill('#itemDescription', 'Updated Description');
        await page.click('button:has-text("Add Item")');
        await page.waitForSelector('.item:has-text("Updated Test Item")');
        const updatedText = await page.textContent('.item:has-text("Updated Test Item")');
        expect(updatedText).toContain('Updated Test Item');
    });

});
