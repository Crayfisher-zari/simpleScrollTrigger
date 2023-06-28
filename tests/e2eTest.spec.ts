import { test, expect } from "@playwright/test";

const scrollTo = (node: HTMLElement) => {
  node.scrollIntoView({ block: "center", behavior: "smooth" });
};

const scrollTop = () => {
  window.scrollTo(0, 0);
};

test("Callback Test (not once)", async ({ page }) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/01/");

  const locator = page.locator(".callbackText");
  await expect(locator).toContainText("---");

  const locatorMiddle = page.locator("#middle");
  const locatorEnd = page.locator("#end");
  const locatorStart = page.locator(".scroll");

  // 真ん中までいったらonEnter
  await locatorMiddle.evaluate(scrollTo);

  await expect(locator).toContainText("onEnter");

  // 通り過ぎたらonLeave
  await locatorEnd.evaluate(scrollTo);
  await expect(locator).toContainText("onLeave");

  // 戻ってきたらonEnterBack
  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnterBack");

  // 戻り去ったらonLeaveBack
  await locatorStart.evaluate(scrollTop);

  await expect(locator).toContainText("onLeaveBack");
});

test("Callback Test (once)", async ({ page }) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/02/");

  const locator = page.locator(".callbackText");

  const locatorMiddle = page.locator("#middle");
  const locatorEnd = page.locator("#end");
  const locatorStart = page.locator(".scroll");

  // ページ下までいって戻ってくる
  await locatorEnd.evaluate(scrollTo);
  await locatorStart.evaluate(scrollTop);


  // 戻ってきたら真ん中まで移動
  // 変わらず"onLeaveBack"のままが期待値
  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onLeaveBack");

  await locatorEnd.evaluate(scrollTo);
  await expect(locator).toContainText("onLeaveBack");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onLeaveBack");

  await locatorStart.evaluate(scrollTop);

  await expect(locator).toContainText("onLeaveBack");
});

test("Initial OnEnter Callback Test (all range at middle, not once)", async ({
  page,
}) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/03/#middle");

  const locator = page.locator(".callbackText");

  const locatorMiddle = page.locator("#middle");
  const locatorEnd = page.locator("#end");
  const locatorStart = page.locator(".scroll");

  await page.waitForTimeout(200);

  await expect(locator).toContainText("onEnter");

  await locatorEnd.evaluate(scrollTo);
  await expect(locator).toContainText("onLeave");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnterBack");

  await locatorStart.evaluate(scrollTop);

  await expect(locator).toContainText("onLeaveBack");
});

test("Initial OnEnter Callback Test (all range at end, not once)", async ({
  page,
}) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/03/#end");

  const locator = page.locator(".callbackText");

  const locatorMiddle = page.locator("#middle");
  const locatorEnd = page.locator("#end");
  const locatorStart = page.locator(".scroll");

  // all rangeなら#endの場所でもonEnterが期待値
  await expect(locator).toContainText("onEnter");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnterBack");

  await locatorStart.evaluate(scrollTop);

  await expect(locator).toContainText("onLeaveBack");
});

test("Initial OnEnter Callback Test (all range at middle, once)", async ({
  page,
}) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/04/#middle");

  const locator = page.locator(".callbackText");

  const locatorMiddle = page.locator("#middle");
  const locatorEnd = page.locator("#end");
  const locatorStart = page.locator(".scroll");

  await page.waitForTimeout(200);
  await expect(locator).toContainText("onEnter");

  await locatorEnd.evaluate(scrollTo);
  await expect(locator).toContainText("onLeave");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnterBack");

  await locatorStart.evaluate(scrollTop);

  await expect(locator).toContainText("onLeaveBack");

  // 戻ってもonLeaveBackのまま
  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onLeaveBack");
});

test("Initial OnEnter Callback Test (all range at end, once)", async ({
  page,
}) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/04/#end");

  const locator = page.locator(".callbackText");

  const locatorMiddle = page.locator("#middle");
  const locatorEnd = page.locator("#end");
  const locatorStart = page.locator(".scroll");

  await page.waitForTimeout(200);
  await expect(locator).toContainText("onEnter");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnterBack");

  await locatorStart.evaluate(scrollTop);

  await expect(locator).toContainText("onLeaveBack");

  // 戻ってもonLeaveBackのまま
  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onLeaveBack");
});

test("Initial OnLeave Callback Test (all range at end, not once)", async ({
  page,
}) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/05/#end");

  const locator = page.locator(".callbackText");

  const locatorMiddle = page.locator("#middle");
  const locatorEnd = page.locator("#end");
  const locatorStart = page.locator(".scroll");

  await page.waitForTimeout(200);
  // onEnterが全域の場合はonLeaveより優先される
  await expect(locator).toContainText("onEnter");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnterBack");

  await locatorStart.evaluate(scrollTop);

  await expect(locator).toContainText("onLeaveBack");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnter");
});

test("Initial OnLeave Callback Test (end range at end, not once)", async ({
  page,
}) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/06/#end");

  const locator = page.locator(".callbackText");

  const locatorMiddle = page.locator("#middle");
  const locatorEnd = page.locator("#end");
  const locatorStart = page.locator(".scroll");

  await page.waitForTimeout(200);
  // onEnterのrangeがendの場合はonLeaveになる
  await expect(locator).toContainText("onLeave");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnterBack");

  await locatorStart.evaluate(scrollTop);

  await expect(locator).toContainText("onLeaveBack");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnter");
});

test("Initial OnLeave Callback Test (end range at end, once)", async ({
  page,
}) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/07/#end");

  const locator = page.locator(".callbackText");

  const locatorMiddle = page.locator("#middle");
  const locatorEnd = page.locator("#end");
  const locatorStart = page.locator(".scroll");

  await page.waitForTimeout(200);
  // onEnterのrangeがendの場合はonLeaveになる
  await expect(locator).toContainText("onLeave");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnterBack");

  await locatorStart.evaluate(scrollTop);

  await expect(locator).toContainText("onLeaveBack");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnter");
});

test("Initial OnEnter Callback Test (end range at end, not once, not InitOnEnter, not InitOnLeave)", async ({
  page,
}, { workerIndex }) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/08/#end");

  const locator = page.locator(".callbackText");

  const locatorMiddle = page.locator("#middle");
  const locatorEnd = page.locator("#end");
  const locatorStart = page.locator(".scroll");

  await page.waitForTimeout(200);
  // onEnterがないので初期値---が期待値
  await expect(locator).toContainText("---");

  await locatorStart.evaluate(scrollTop);

  await expect(locator).toContainText("---");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnter");

  await locatorEnd.evaluate(scrollTo);
  await expect(locator).toContainText("onLeave");
});

test("Initial OnEnter Callback Test (end range at middle, not once, not InitOnEnter, InitOnLeave)", async ({
  page,
}) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/09/#middle");

  const locator = page.locator(".callbackText");

  const locatorMiddle = page.locator("#middle");
  const locatorEnd = page.locator("#end");
  const locatorStart = page.locator(".scroll");

  await page.waitForTimeout(200);
  // onEnterがないので初期値---が期待値
  await expect(locator).toContainText("---");

  await locatorStart.evaluate(scrollTop);

  await expect(locator).toContainText("---");

  await locatorEnd.evaluate(scrollTo);
  await expect(locator).toContainText("onLeave");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnterBack");

  await locatorStart.evaluate(scrollTop);

  await expect(locator).toContainText("onLeaveBack");
});

test("Initial OnEnter Callback Test (end range at end, not once, not InitOnEnter, InitOnLeave)", async ({
  page,
}) => {
  await page.goto("http://localhost:3333/simpleScrollTrigger/tests/09/#end");

  const locator = page.locator(".callbackText");

  const locatorMiddle = page.locator("#middle");
  const locatorEnd = page.locator("#end");
  const locatorStart = page.locator(".scroll");

  await page.waitForTimeout(200);
  // onEnterがないので初期値---が期待値
  await expect(locator).toContainText("onLeave");

  await locatorMiddle.evaluate(scrollTo);
  await expect(locator).toContainText("onEnterBack");

  await locatorStart.evaluate(scrollTop);

  await expect(locator).toContainText("onLeaveBack");

  await locatorEnd.evaluate(scrollTo);
  await expect(locator).toContainText("onLeave");
});
