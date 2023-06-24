import { CheckOverLine } from "../features/checker/CheckOverLine";
import { checkInitOption } from "../features/checker/checkInitOption";
import { IntersectionState } from "../features/state/IntersectionState";
import { Callback, InitOnCallOption } from "../types/Options";

type Arg = {
  forwardCallback: Callback;
  backCallback: Callback;
  isOnce: boolean;
  initOnCallOption?: InitOnCallOption | boolean;
  endViewPortPx?: number;
  endTargetPx?: number;
  state: IntersectionState;
  checkOverLine?: CheckOverLine;
};

const whichCallbackEnabled = (forward: Callback, back: Callback) => {
  if (forward !== undefined && back == undefined) {
    return "forward";
  }
  if (forward == undefined && back !== undefined) {
    return "back";
  }
  if (forward !== undefined && back !== undefined) {
    return "both";
  }
  return "nothing";
};

/**
 * Intersection Observerのコールバック関数を作成します
 */
export class IntersectionCallback {
  #isOnce = false;
  #initOnCallOption: InitOnCallOption | boolean = false;

  #forwardCallback: Callback = undefined;
  #backCallback: Callback = undefined;

  #state: IntersectionState;
  #checkOverLine: CheckOverLine | undefined = undefined;
  #isInitCalled = false;
  constructor({
    forwardCallback,
    backCallback,
    isOnce,
    initOnCallOption = false,
    state,
    checkOverLine,
  }: Arg) {
    this.#forwardCallback = forwardCallback;
    this.#backCallback = backCallback;
    this.#isOnce = isOnce;
    this.#initOnCallOption = initOnCallOption;
    this.#state = state;
    this.#checkOverLine = checkOverLine;
  }

  callback(entries: IntersectionObserverEntry[]) {
    // 判定範囲の矩形のy座標とトリガー要素のy座標。入った時はこの差は必ずマイナスになる。
    const rectY =
      (entries[0].rootBounds?.y ?? 0) - entries[0].boundingClientRect.y;
    // 初回コールバックの処理
    if (!this.#isInitCalled && this.#forwardCallback) {
      this.#isInitCalled = true;
      // onEneterBackが呼ばれていたときには実行しない（リサイズ時対策）
      // entries[0].rootBoundsがnullのときは実行しない（タイプガード）
      // this.#checkOverLineが無効のときは実行しない（endの方）
      // initOnCallOptionが無効な場合は実行しない
      if (
        this.#state.lastBackCallback === "onEnterBack" ||
        !entries[0].rootBounds ||
        !this.#checkOverLine ||
        this.#initOnCallOption === false
      ) {
        return;
      }
      const range = checkInitOption(this.#initOnCallOption);

      // 判定範囲が全域の場合 開始位置を過ぎているか
      if (range === "all" && this.#checkOverLine.isOverStartLine(entries)) {
        // 初めて入ったときに入域済みフラグをたてる
        this.#state.changeToEntered();
        this.#forwardCallback();
        this.#state.lastCalledDirection = "forward";
        if (this.#isOnce) {
          this.#state.changeToForwardCalled();
        }
        return;
      }

      // 判定範囲がendまでの場合 開始位置を過ぎ、終了位置手前だったら実行
      if (
        range === "end" &&
        this.#checkOverLine.isOverStartLine(entries) &&
        !this.#checkOverLine.isOverEndLine(entries)
      ) {
        // 初めて入ったときに入域済みフラグをたてる
        this.#state.changeToEntered();
        this.#forwardCallback();
        this.#state.lastCalledDirection = "forward";
        if (this.#isOnce) {
          this.#state.changeToForwardCalled();
        }
      }
      return;
    }

    // 前方方向のコールバック
    if (!this.#state.isForwardCalled && this.#forwardCallback) {
      // 交差判定があり、y座標の差がマイナスの時は入ったときのコールバックを呼ぶ
      if (entries[0].isIntersecting && rectY < 0) {
        // 初めて入ったときに入域済みフラグをたてる
        if (this.#state.isEntered === false) {
          this.#state.changeToEntered();
        }
        // isOnceが有効な場合に呼ばれたらフラグを建てる
        if (this.#isOnce) {
          this.#state.changeToForwardCalled();
        }

        this.#forwardCallback();
        this.#state.lastCalledDirection = "forward";
      }
    }

    // 後方方向のコールバック
    if (!this.#state.isBackCalled && this.#backCallback) {
      // 交差判定がなく、y座標の差がマイナスの時は入ったとき、さらにforward関数がある場合は入域済みフラグがある時に出ていったときのコールバックを呼ぶ
      if (
        !entries[0].isIntersecting &&
        rectY < 0 &&
        ((this.#forwardCallback && this.#state.isEntered) ||
          !this.#forwardCallback)
      ) {
        // isOnceが有効な場合に呼ばれたらフラグを建てる
        if (this.#isOnce) {
          this.#state.changeToBackCalled();
        }
        this.#backCallback();
        this.#state.lastCalledDirection = "back";
      }
    }
  }

  isAllCalled() {
    if (
      whichCallbackEnabled(this.#forwardCallback, this.#backCallback) ===
      "forward"
    ) {
      return Boolean(this.#state.isForwardCalled);
    }
    if (
      whichCallbackEnabled(this.#forwardCallback, this.#backCallback) === "back"
    ) {
      return Boolean(this.#state.isBackCalled);
    }
    if (
      whichCallbackEnabled(this.#forwardCallback, this.#backCallback) === "both"
    ) {
      return Boolean(this.#state.isForwardCalled && this.#state.isBackCalled);
    }
    return false;
  }
}
