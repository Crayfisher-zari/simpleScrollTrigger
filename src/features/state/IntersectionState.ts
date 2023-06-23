export class IntersectionState {
  /** 交差判定範囲に入ったか */
  #isEntered: boolean = false;
  /** 読み込み時の初回処理が呼ばれたか */
  #isInitCalled: boolean = false;
  /** 前方コールバックが呼ばれたか */
  #isForwardCalled: boolean = false;
  /** 後方コールバックが呼ばれたか */
  #isBackCalled: boolean = false;
  /** 最後に呼ばれたコールバックの向き */
  #lastCalledDirection: "forward" | "back" | null = null;
  /** 最後に呼ばれた後方コールバック */
  #lastForwardCalled: "onEnter" | "onLeaveBack" | null = null;
  /** 最後に呼ばれた後方コールバック */
  #lastBackCalled: "onLeave" | "onEnterBack" | null = null;

  get isEntered(): boolean {
    return this.#isEntered;
  }

  changeToEntered() {
    this.#isEntered = true;
  }

  get isInitCalled(): boolean {
    return this.#isInitCalled;
  }

  changeToInitCalled() {
    this.#isInitCalled = true;
  }

  get isForwardCalled(): boolean {
    return this.#isForwardCalled;
  }

  changeToForwardCalled() {
    this.#isForwardCalled = true;
  }

  get isBackCalled(): boolean {
    return this.#isBackCalled;
  }

  changeToBackCalled() {
    this.#isBackCalled = true;
  }

  get lastCalledDirection() {
    return this.#lastCalledDirection;
  }

  set lastCalledDirection(last) {
    if (last) {
      this.#lastCalledDirection = last;
    }
  }

  get lastForwardCallback() {
    return this.#lastForwardCalled;
  }

  set lastForwardCallback(forward) {
    if (forward) {
      this.#lastForwardCalled = forward;
    }
  }

  get lastBackCallback() {
    return this.#lastBackCalled;
  }

  set lastBackCallback(last) {
    if (last) {
      this.#lastBackCalled = last;
    }
  }
}
