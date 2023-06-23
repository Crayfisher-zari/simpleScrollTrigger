import {
  IntersectionCallback,
} from "./callback/IntersectionCallback";
import { CheckOverLine } from "./features/checker/CheckOverLine";
import { checkEndInitOption } from "./features/checker/checkEndInitOption";
import { convertTargetOption2Px } from "./features/converter/convertTargetOption2Px";
import { convertViewPortOption2Px } from "./features/converter/convertViewPortOption2Px";
import { IntersectionState } from "./features/state/IntersectionState";
import { Callback, InitOnCallOption, Options } from "./types/Options";
import { PointOption } from "./types/PointOption";

type CallBack = {
  callback: (entries: IntersectionObserverEntry[]) => void;
  isAllCalled: () => boolean;
  getLastCalled: () => "forward" | "back" | null;
};

export class SimpleScrollTrigger {
  #triggerElemet: Element | null = null;

  #startViewPortPoint: number | PointOption | undefined = undefined;
  #startTriggerPoint: number | PointOption | undefined = undefined;

  #endViewPortPoint: number | PointOption | undefined = undefined;
  #endTriggerPoint: number | PointOption | undefined = undefined;

  #onEnter: Callback | undefined = undefined;
  #onLeaveBack: Callback | undefined = undefined;
  #onLeave: Callback | undefined = undefined;
  #onEnterBack: Callback | undefined = undefined;

  #startCallbacks: IntersectionCallback | null = null;
  #endCallbacks: IntersectionCallback | null = null;

  #startObserver: IntersectionObserver | null = null;
  #endObserver: IntersectionObserver | null = null;

  #startViewPortPx = 0;
  #startTargetPx = 0;

  #endViewPortPx = 0;
  #endTargetPx = 0;

  #isOnce = false;

  #initOnEnter: boolean | InitOnCallOption | undefined = undefined;
  #initOnLeave: boolean | undefined = undefined;

  #shouldMakeEndIntersection = false;

  // @ts-ignore 現状呼び出しはないが将来的に残しておく
  #lastStartCalled: "onEnter" | "onLeaveBack" | null = null;
  #lastEndCalled: "onLeave" | "onEnterBack" | null = null;

  #state: IntersectionState = new IntersectionState();

  constructor({
    trigger,
    onEnter,
    onLeaveBack,
    onLeave,
    onEnterBack,
    startViewPortPoint,
    startTriggerPoint,
    endViewPortPoint,
    endTriggerPoint,
    once,
    initOnEnter,
    initOnLeave,
  }: Options) {
    if (!trigger) {
      console.warn("Trigger element is Null");
      return;
    }
    this.#triggerElemet = trigger;
    this.#isOnce = Boolean(once);

    this.#shouldMakeEndIntersection = Boolean(onLeave) || Boolean(onEnterBack);

    this.#startViewPortPoint = startViewPortPoint;
    this.#startTriggerPoint = startTriggerPoint;
    this.#endViewPortPoint = endViewPortPoint;
    this.#endTriggerPoint = endTriggerPoint;

    this.#onEnter = onEnter;
    this.#onLeaveBack = onLeaveBack;
    this.#onLeave = onLeave;
    this.#onEnterBack = onEnterBack;

    this.#initOnEnter = initOnEnter;
    this.#initOnLeave = initOnLeave;

    this.#setupObserver();

    // リサイズしたら再セットアップします。
    window.addEventListener("resize", () => {
      this.disconnectObserve();
      this.#startObserver = null;
      this.#endObserver = null;

      if (!this.#isSetupPrevented) {
        this.#setupObserver();
      }
    });
  }

  /**
   * オブザーバーをセットアップします。
   */
  #setupObserver() {
    if (!this.#triggerElemet) {
      return;
    }
    // 始点の設定
    this.#startViewPortPx = convertViewPortOption2Px(this.#startViewPortPoint);
    this.#startTargetPx = convertTargetOption2Px(
      this.#triggerElemet,
      this.#startTriggerPoint
    );

    // 終点の指定
    this.#endViewPortPx = convertViewPortOption2Px(this.#endViewPortPoint);
    this.#endTargetPx = convertTargetOption2Px(
      this.#triggerElemet,
      this.#endTriggerPoint
    );

    const checkOverLine = new CheckOverLine({
      endTargetPx: this.#endTargetPx,
      endViewPortPx: this.#endViewPortPx,
    });

    // コールバックの作成
    this.#startCallbacks = new IntersectionCallback({
      forwardCallback: this.#onEnter,
      backCallback: this.#onLeaveBack,
      isOnce: this.#isOnce,
      initOnCallOption: this.#initOnEnter,
      checkOverLine: checkOverLine,
      state: this.#state,
    });

    const endInitOption = checkEndInitOption(
      this.#initOnEnter,
      this.#initOnLeave
    );

    this.#endCallbacks = new IntersectionCallback({
      forwardCallback: this.#onLeave,
      backCallback: this.#onEnterBack,
      isOnce: this.#isOnce,
      initOnCallOption: endInitOption,
      state: this.#state,
    });
    // 閾値の配列作成
    const threshold = [0, 1];

    this.#startObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (!this.#startCallbacks) {
          return;
        }
        this.#startCallbacks.callback(entries);
        if (this.#state.lastCalledDirection === "forward") {
          this.#state.lastForwardCallback = "onEnter";
        } else if (this.#state.lastCalledDirection === "back") {
          this.#state.lastForwardCallback = "onLeaveBack";
        } else {
          this.#state.lastForwardCallback = null;
        }
        // onceフラグがあり、すべてのコールバックが呼ばれたら監視を停止する
        if (this.#isOnce && this.#startCallbacks.isAllCalled()) {
          this.#startObserver?.disconnect();
        }
      },
      {
        rootMargin: `${this.#startTargetPx + this.#startViewPortPx}px 0px ${-(
          this.#startTargetPx + this.#startViewPortPx
        )}px`,
        threshold: threshold,
      }
    );

    this.#startObserver.observe(this.#triggerElemet);

    // 終点のオブザーバー
    if (!this.#shouldMakeEndIntersection) {
      // 終点の設定がない場合は作らない
      return;
    }

    this.#endObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (!this.#endCallbacks) {
          return;
        }
        this.#endCallbacks.callback(entries);
        if (this.#state.lastCalledDirection === "forward") {
          this.#state.lastBackCallback = "onLeave";
        } else if (this.#state.lastCalledDirection === "back") {
          this.#state.lastBackCallback = "onEnterBack";
        } else {
          this.#state.lastBackCallback = null;
        }

        // onceフラグがあり、すべてのコールバックが呼ばれたら監視を停止する
        if (this.#isOnce && this.#endCallbacks.isAllCalled()) {
          this.#endObserver?.disconnect();
        }
      },
      {
        rootMargin: `${this.#endViewPortPx + this.#endTargetPx}px 0px ${-(
          this.#endViewPortPx + this.#endTargetPx
        )}px`,
        threshold: threshold,
      }
    );

    this.#endObserver.observe(this.#triggerElemet);
  }

  /**
   * 監視を停止します
   */
  public disconnectObserve() {
    this.#startObserver?.disconnect();
    this.#endObserver?.disconnect();
  }

  /**
   * onceが有効ですべてのコールバックが呼ばれていたら再セットアップはしない
   */
  get #isSetupPrevented(): boolean {
    return (
      this.#isOnce &&
      Boolean(this.#startCallbacks?.isAllCalled()) &&
      Boolean(this.#endCallbacks?.isAllCalled())
    );
  }
}
