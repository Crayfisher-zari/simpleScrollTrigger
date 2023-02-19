import { Callback, InitOnCallOption } from "../types/Options";
import { Data } from "../utils/data";

type Arg = {
  entries: IntersectionObserverEntry[];
  forwardCallback: Callback;
  initCall: boolean | InitOnCallOption | undefined;
  endViewPortPx?: number;
  endTargetPx?: number;
  isOnce: boolean;
  isEntered: Data<boolean>;
  isForwardCalled: Data<boolean>;
};

/**
 * 初期読み込み時のコールバック処理
 */
export const initCallback = ({
  entries,
  forwardCallback,
  initCall: initOnEnter,
  endViewPortPx,
  endTargetPx,
  isOnce,
  isEntered,
  isForwardCalled,
}: Arg) => {
  // 設定が無効な場合はリターン
  if (!entries[0].rootBounds || !forwardCallback || !initOnEnter) {
    return;
  }
  const rectY =
    (entries[0].rootBounds?.y ?? 0) - entries[0].boundingClientRect.y;
  const range = checkInitOption(initOnEnter);

  console.log(endViewPortPx, endTargetPx, entries[0].boundingClientRect);

  // 開始位置を過ぎているか
  const isOverStartLine = entries[0].rootBounds.height + rectY > 0;

  // 判定範囲が全域の場合
  if (range === "all" && isOverStartLine) {
    // 初めて入ったときに入域済みフラグをたてる
    isEntered.value = true;
    forwardCallback();
    if (isOnce) {
      isForwardCalled.value = true;
    }
    return;
  }
  console.log(
    range === "endTrigger" && endTargetPx && endViewPortPx && isOverStartLine
  );

  // 判定範囲がendまでの場合
  if (
    range === "endTrigger" &&
    endTargetPx &&
    endViewPortPx &&
    isOverStartLine
  ) {
    // 終了位置を過ぎているか
    const isOverEndLine =
      entries[0].boundingClientRect.top + endTargetPx - endViewPortPx < 0;
    if (isOverStartLine && !isOverEndLine) {
      // 開始位置を過ぎ、終了位置手前だったら実行
      // 初めて入ったときに入域済みフラグをたてる
      isEntered.value = true;
      forwardCallback();
      if (isOnce) {
        isForwardCalled.value = true;
      }
    }
  }
};

const checkInitOption = (initOption: true | InitOnCallOption) => {
  if (initOption === true) {
    return "all";
  } else {
    return initOption.range;
  }
};
