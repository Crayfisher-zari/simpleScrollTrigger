import type { InitOnCallOption } from "../../types/Options";

export const checkInitOption = (initOption: true | InitOnCallOption) => {
  if (initOption === true) {
    return "all";
  } else {
    return initOption.range;
  }
};