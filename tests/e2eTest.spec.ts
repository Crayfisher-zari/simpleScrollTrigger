import { test, expect } from "@playwright/test";

test("Callback Test (not once)", async ({ page }) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/01/");

  const locator = page.locator(".callbackText");
  await expect(locator).toContainText("---");

  const elementMiddleHandle = await page.$("#middle");
  const elementEndHandle = await page.$("#end");
  const elementStartHandle = await page.$(".scroll");

  if (!elementMiddleHandle || !elementEndHandle || !elementStartHandle) {
    throw new Error("Element is Null");
  }

  // 真ん中までいったらonEnter
  await elementMiddleHandle.scrollIntoViewIfNeeded();
  await expect(locator).toContainText("onEnter");

  // 通り過ぎたらonLeave
  await elementEndHandle.scrollIntoViewIfNeeded();
  await expect(locator).toContainText("onLeave");

  // 戻ってきたらonEnterBack
  await elementMiddleHandle.scrollIntoViewIfNeeded();
  await expect(locator).toContainText("onEnterBack");

  // 戻り去ったらonLeaveBack
  await elementStartHandle.scrollIntoViewIfNeeded();
  await expect(locator).toContainText("onLeaveBack");
});

test("Callback Test (once)", async ({ page }) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/02/");

  const locator = page.locator(".callbackText");

  const elementMiddleHandle = await page.$("#middle");
  const elementEndHandle = await page.$("#end");
  const elementStartHandle = await page.$(".scroll");
  
  if (!elementMiddleHandle || !elementEndHandle || !elementStartHandle) {
    throw new Error("Element is Null");
  }

  // ページ下までいって戻ってくる
  await elementMiddleHandle.scrollIntoViewIfNeeded();
  await elementEndHandle.scrollIntoViewIfNeeded();
  await elementMiddleHandle.scrollIntoViewIfNeeded();
  await elementStartHandle.scrollIntoViewIfNeeded();

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

test("Initial Callback Test (start)", async ({ page }) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/03/#middle");

  const locator = page.locator(".callbackText");

  const elementMiddleHandle = await page.$("#middle");
  const elementEndHandle = await page.$("#end");
  const elementStartHandle = await page.$(".scroll");
  
  if (!elementMiddleHandle || !elementEndHandle || !elementStartHandle) {
    throw new Error("Element is Null");
  }

  test.setTimeout(1000);    
  await expect(locator).toContainText("onEnter");

});
