import { test, expect } from '@playwright/test';

test.describe('Quiz flow', () => {
  test('user can complete the quiz and see configurations', async ({ page }) => {
    await page.goto('/quiz');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    const optionTexts = [
      /Частный дом/i,
      /Минимум|Minimum/i,
      /Магистральный газ|Mainline gas/i,
      /дома стоят плотно|dense/i,
      /На улице|Outside/i,
      /АВР|ATS/i,
    ];

    for (const text of optionTexts) {
      await page.getByRole('button', { name: text }).first().click();
      await page.getByRole('button', { name: /Далее|Next/i }).click();
    }

    await expect(page.getByText(/Анализ завершён|Analysis complete/i)).toBeVisible({
      timeout: 10_000,
    });
    await expect(
      page.getByRole('heading', {
        name: /индивидуальные рекомендации|personalized recommendations/i,
      }),
    ).toBeVisible();
  });
});
