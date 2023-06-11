import { IntersectionState } from "../features/state/IntersectionState";
import { Callback, InitOnCallOption } from "../types/Options";

type InitCallbackArg = {
  entries: IntersectionObserverEntry[];
  forwardCallback: Callback;
  initOption: boolean | InitOnCallOption | undefined;
  endViewPortPx?: number;
  endTargetPx?: number;
  isOnce: boolean;
  state: IntersectionState;
};

export type InitCallback = (arg: InitCallbackArg) => void;

/**
 * 初期読み込み時のコールバック処理
 */
export const initCallback = ({
  entries,
  forwardCallback,
  initOption,
  endViewPortPx,
  endTargetPx,
  isOnce,
  state,
}: InitCallbackArg) => {
  // 設定が無効な場合はリターン
  if (!entries[0].rootBounds || !forwardCallback || !initOnEnter) {
    return;
  }
  // onEneterBackが呼ばれていたときには実行しない（リサイズ時対策）
  if (state.lastBackCallback === "onEnterBack") {
    return;
  }
  const rectY =
    (entries[0].rootBounds?.y ?? 0) - entries[0].boundingClientRect.y;
  const range = checkInitOption(initOption);

  // 開始位置を過ぎているか
  const isOverStartLine = entries[0].rootBounds.height + rectY > 0;

  // 判定範囲が全域の場合
  if (range === "all" && isOverStartLine) {
    // 初めて入ったときに入域済みフラグをたてる
    state.changeToEntered();
    forwardCallback();
    state.lastCalledDirection = "forward";
    if (isOnce) {
      state.changeToForwardCalled();
    }
    return;
  }

  // 判定範囲がendまでの場合
  if (range === "end" && endTargetPx && endViewPortPx && isOverStartLine) {
    // 終了位置を過ぎているか
    const isOverEndLine =
      entries[0].boundingClientRect.top +
        endTargetPx -
        window.innerHeight +
        endViewPortPx <
      0;
    if (isOverStartLine && !isOverEndLine) {
      // 開始位置を過ぎ、終了位置手前だったら実行
      // 初めて入ったときに入域済みフラグをたてる
      state.changeToEntered();
      forwardCallback();
      state.lastCalledDirection = "forward";
      if (isOnce) {
        state.changeToForwardCalled();
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

export const generateInitCallback = ({
  forwardCallback,
  initOption,
  endViewPortPx,
  endTargetPx,
  isOnce,
  state,
}: any) => {
  return (entries: IntersectionObserverEntry[]) =>
    initCallback({
      entries,
      forwardCallback,
      initOption,
      endViewPortPx,
      endTargetPx,
      isOnce,
      state,
    });
};
