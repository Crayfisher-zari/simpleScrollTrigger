import { test, expect } from "@playwright/test";

test("Callback Test (not once)", async ({ page }) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/01/");

  const locator = page.locator(".callbackText");
  await expect(locator).toContainText("---");

  const elementMiddleHandle = await page.$("#middle");
  if (elementMiddleHandle) {
    await elementMiddleHandle.scrollIntoViewIfNeeded();
    await expect(locator).toContainText("onEnter");
  }
  const elementEndHandle = await page.$("#end");
  if (elementEndHandle) {
    await elementEndHandle.scrollIntoViewIfNeeded();
    await expect(locator).toContainText("onLeave");
  }
  if (elementMiddleHandle) {
    await elementMiddleHandle.scrollIntoViewIfNeeded();
    await expect(locator).toContainText("onEnterBack");
  }
  const elementStartHandle = await page.$(".scroll");
  if (elementStartHandle) {
    await elementStartHandle.scrollIntoViewIfNeeded();
    await expect(locator).toContainText("onLeaveBack");
  }
});

test("Callback Test (once)", async ({ page }) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/02/");

  const locator = page.locator(".callbackText");

  // ページ下までいって戻ってくる
  const elementMiddleHandle = await page.$("#middle");
  if (elementMiddleHandle) {
    await elementMiddleHandle.scrollIntoViewIfNeeded();
  }
  const elementEndHandle = await page.$("#end");
  if (elementEndHandle) {
    await elementEndHandle.scrollIntoViewIfNeeded();
  }
  if (elementMiddleHandle) {
    await elementMiddleHandle.scrollIntoViewIfNeeded();
  }
  const elementStartHandle = await page.$(".scroll");
  if (elementStartHandle) {
    await elementStartHandle.scrollIntoViewIfNeeded();
  }

  // 戻ってきたら真ん中まで移動
  // 変わらず"onLeaveBack"のままが期待値
  if (elementMiddleHandle) {
    await elementMiddleHandle.scrollIntoViewIfNeeded();
    await expect(locator).toContainText("onLeaveBack");
  }

  if (elementEndHandle) {
    await elementEndHandle.scrollIntoViewIfNeeded();
    await expect(locator).toContainText("onLeaveBack");
  }

  if (elementMiddleHandle) {
    await elementMiddleHandle.scrollIntoViewIfNeeded();
    await expect(locator).toContainText("onLeaveBack");
  }

  if (elementStartHandle) {
    await elementStartHandle.scrollIntoViewIfNeeded();
    await expect(locator).toContainText("onLeaveBack");
  }
});
