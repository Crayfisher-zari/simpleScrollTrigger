import { test, expect } from "@playwright/test";

let index = 0

// test("Callback Test (not once)", async ({ page }) => {
//   await page.goto("http://localhost:3333/simpleScrollTrigger/tests/01/");

//   const locator = page.locator(".callbackText");
//   await expect(locator).toContainText("---");

//   const elementMiddleHandle = await page.$("#middle");
//   const elementEndHandle = await page.$("#end");
//   const elementStartHandle = await page.$(".scroll");

//   if (!elementMiddleHandle || !elementEndHandle || !elementStartHandle) {
//     throw new Error("Element is Null");
//   }

//   // 真ん中までいったらonEnter
//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onEnter");

//   // 通り過ぎたらonLeave
//   await elementEndHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeave");

//   // 戻ってきたらonEnterBack
//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onEnterBack");

//   // 戻り去ったらonLeaveBack
//   await elementStartHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeaveBack");
// });

// test("Callback Test (once)", async ({ page }) => {
//   await page.goto("http://localhost:3333/simpleScrollTrigger/tests/02/");

//   const locator = page.locator(".callbackText");

//   const elementMiddleHandle = await page.$("#middle");
//   const elementEndHandle = await page.$("#end");
//   const elementStartHandle = await page.$(".scroll");

//   if (!elementMiddleHandle || !elementEndHandle || !elementStartHandle) {
//     throw new Error("Element is Null");
//   }

//   // ページ下までいって戻ってくる
//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await elementEndHandle.scrollIntoViewIfNeeded();
//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await elementStartHandle.scrollIntoViewIfNeeded();

//   // 戻ってきたら真ん中まで移動
//   // 変わらず"onLeaveBack"のままが期待値
//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeaveBack");

//   await elementEndHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeaveBack");

//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeaveBack");

//   await elementStartHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeaveBack");
// });

// test("Initial OnEnter Callback Test (all range start not once)", async ({
//   page,
// }) => {
//   await page.goto("http://localhost:3333/simpleScrollTrigger/tests/03/#middle");

//   const locator = page.locator(".callbackText");

//   const elementMiddleHandle = await page.$("#middle");
//   const elementEndHandle = await page.$("#end");
//   const elementStartHandle = await page.$(".scroll");

//   if (!elementMiddleHandle || !elementEndHandle || !elementStartHandle) {
//     throw new Error("Element is Null");
//   }

//   await page.waitForTimeout(500);

//   await expect(locator).toContainText("onEnter");

//   await elementEndHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeave");

//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onEnterBack");

//   await elementStartHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeaveBack");
// });

test("Initial OnEnter Callback Test (all range end)", async ({ page }) => {
  index++;
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/03/#end");

  const locator = page.locator(".callbackText");

  const elementMiddleHandle = await page.$("#middle");
  const elementEndHandle = await page.$("#end");
  const elementStartHandle = await page.$(".scroll");

  if (!elementMiddleHandle || !elementEndHandle || !elementStartHandle) {
    throw new Error("Element is Null");
  }


  await page.screenshot({path: `screenshot0.png`});


  await expect(locator).toContainText("onEnter");

  // await elementMiddleHandle.scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, -2400)
  await page.waitForTimeout(100);
  await page.screenshot({path: `screenshot.png`});

  await expect(locator).toContainText("onEnterBack");

  await elementStartHandle.scrollIntoViewIfNeeded();
  await expect(locator).toContainText("onLeaveBack");
});

// test("Initial OnEnter Callback Test (all range start once)", async ({
//   page,
// }) => {
//   await page.goto("http://localhost:3333/simpleScrollTrigger/tests/04/#middle");

//   const locator = page.locator(".callbackText");

//   const elementMiddleHandle = await page.$("#middle");
//   const elementEndHandle = await page.$("#end");
//   const elementStartHandle = await page.$(".scroll");

//   if (!elementMiddleHandle || !elementEndHandle || !elementStartHandle) {
//     throw new Error("Element is Null");
//   }

//   await page.waitForTimeout(500);
//   await expect(locator).toContainText("onEnter");

//   await elementEndHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeave");

//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onEnterBack");

//   await elementStartHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeaveBack");

//   // 戻ってもonLeaveBackのまま
//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeaveBack");
// });

// test("Initial OnEnter Callback Test (all range end once)", async ({ page }) => {
//   await page.goto("http://localhost:3333/simpleScrollTrigger/tests/04/#end");

//   const locator = page.locator(".callbackText");

//   const elementMiddleHandle = await page.$("#middle");
//   const elementEndHandle = await page.$("#end");
//   const elementStartHandle = await page.$(".scroll");

//   if (!elementMiddleHandle || !elementEndHandle || !elementStartHandle) {
//     throw new Error("Element is Null");
//   }

//   await page.waitForTimeout(500);
//   await expect(locator).toContainText("onEnter");

//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onEnterBack");

//   await elementStartHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeaveBack");

//   // 戻ってもonLeaveBackのまま
//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeaveBack");
// });

// test("Initial OnLeave Callback Test (all range not once)", async ({ page }) => {
//   await page.goto("http://localhost:3333/simpleScrollTrigger/tests/05/#end");

//   const locator = page.locator(".callbackText");

//   const elementMiddleHandle = await page.$("#middle");
//   const elementEndHandle = await page.$("#end");
//   const elementStartHandle = await page.$(".scroll");

//   if (!elementMiddleHandle || !elementEndHandle || !elementStartHandle) {
//     throw new Error("Element is Null");
//   }

//   await page.waitForTimeout(500);
//   // onEnterが全域の場合はonLeaveより優先される
//   await expect(locator).toContainText("onEnter");

//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onEnterBack");

//   await elementStartHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeaveBack");

//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onEnter");
// });


// test("Initial OnLeave Callback Test (end range not once)", async ({ page }) => {
//   await page.goto("http://localhost:3333/simpleScrollTrigger/tests/06/#end");

//   const locator = page.locator(".callbackText");

//   const elementMiddleHandle = await page.$("#middle");
//   const elementEndHandle = await page.$("#end");
//   const elementStartHandle = await page.$(".scroll");

//   if (!elementMiddleHandle || !elementEndHandle || !elementStartHandle) {
//     throw new Error("Element is Null");
//   }

//   await page.waitForTimeout(500);
//   // onEnterがendの場合はonLeaveになる
//   await expect(locator).toContainText("onLeave");

//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onEnterBack");

//   await elementStartHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onLeaveBack");

//   await elementMiddleHandle.scrollIntoViewIfNeeded();
//   await expect(locator).toContainText("onEnter");
// });
