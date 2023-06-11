export class IntersectionState {
  #isEntered: boolean = false;
  #isInitCalled: boolean = false;
  #isForwardCalled: boolean = false;
  #isBackCalled: boolean = false;
  #lastCalled: "forward" | "back" | null = null;
  constructor() {}

  get isEntered(): boolean {
    return this.#isEntered;
  }

  changeToEntered() {
    this.#isEntered = true;
  }

  get isInitCalled(): boolean {
    return this.#isInitCalled;
  }

  
}
