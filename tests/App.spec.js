const { test, expect } = require("@playwright/test");
const { email, password, nameProfile } = require("../user");

test('Successful authorization', async ({ page }) => {
  // Go to https://netology.ru/
  await page.goto('https://netology.ru/');
  await expect(page).toHaveURL('https://netology.ru/'); //проверка добавлена, чтобы получить ниже нормальный скриншот

  await test.info().attach('screenshot Go to https://netology.ru/', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // Click text=Войти
  await page.click('text=Войти');
  await expect(page).toHaveURL('https://netology.ru/?modal=sign_in'); //проверка добавлена, чтобы получить ниже нормальный скриншот

  await test.info().attach('screenshot Click text=Войти', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // Click [placeholder="Email"]
  await page.click('[placeholder="Email"]');
  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', email);

  await test.info().attach('screenshot Fill [placeholder="Email"]', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // Click [placeholder="Пароль"]
  await page.click('[placeholder="Пароль"]');
  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', password);

  await test.info().attach('screenshot Fill [placeholder="Пароль"]', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // Click [data-testid="login-submit-btn"]
   await page.click('[data-testid="login-submit-btn"]');

  await expect(page).toHaveURL(nameProfile);
  await expect(page.getByRole('heading', { name: 'Направления обучения' })).toBeVisible;

  await test.info().attach('screenshot Expected test action', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
  
});

test('Failed authorization by empty password', async ({ page }) => {
  // Go to https://netology.ru/
  await page.goto('https://netology.ru/');

  await test.info().attach('screenshot Go to https://netology.ru/', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // Click text=Войти
  await page.click('text=Войти');

  await test.info().attach('screenshot Click text=Войти', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // Click [placeholder="Email"]
  await page.click('[placeholder="Email"]');
  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', email);

  await test.info().attach('screenshot Fill [placeholder="Email"]', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // Click [placeholder="Пароль"]
  await page.click('[placeholder="Пароль"]');
  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', password+"1");

  await test.info().attach('screenshot Fill [placeholder="Пароль"]', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // Click [data-testid="login-submit-btn"]
   await page.click('[data-testid="login-submit-btn"]');

  await expect(page.getByTestId("login-error-hint")).toBeVisible;
  await expect(page.getByTestId("login-error-hint")).toHaveText("Вы ввели неправильно логин или пароль.");

  await test.info().attach('screenshot Expected test action', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

});

