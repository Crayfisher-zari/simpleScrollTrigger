import { SimpleScrollTrigger } from "../src/SimpleScrollTrigger";

const trigger = document.querySelector(".trigger");
new SimpleScrollTrigger({
  trigger,
  onEnter: () => {
    console.log("onEnter");
  },
  onLeaveBack: () => {
    console.log("onLeaveBack");
  },
  onLeave: () => {
    console.log("onLeave");
  },
  onEnterBack: () => {
    console.log("onEnterBack");
  },
  startViewPortPoint: { value: 100, unit: "%" },
  startTriggerPoint: { value: 50, unit: "px" },
  endViewPortPoint: { value: 0, unit: "%" },
  endTriggerPoint: { value: 100, unit: "%" },
});
