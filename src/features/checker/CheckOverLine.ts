type Arg = {
  endTargetPx: number;
  endViewPortPx: number;
};
export class CheckOverLine {
  #endTargetPx: number = 0;
  #endViewPortPx: number = 0;
  constructor({ endTargetPx, endViewPortPx }: Arg) {
    this.#endTargetPx = endTargetPx;
    this.#endViewPortPx = endViewPortPx;
  }
  isOverStartLine(entries: IntersectionObserverEntry[]): boolean {
    if (!entries[0].rootBounds) {
      return false;
    }
    // 判定範囲の矩形のy座標とトリガー要素のy座標。入った時はこの差は必ずマイナスになる。
    const rectY =
      (entries[0].rootBounds?.y ?? 0) - entries[0].boundingClientRect.y;
    return entries[0].rootBounds.height + rectY > 0;
  }
  isOverEndLine(entries: IntersectionObserverEntry[]): boolean {
    if (!entries[0].rootBounds) {
      return false;
    }
    return (
      entries[0].boundingClientRect.top +
        this.#endTargetPx -
        window.innerHeight +
        this.#endViewPortPx <
      0
    );
  }
}
