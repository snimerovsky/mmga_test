import { Indicator } from "./index";

export function getIndicatorStatus(touched?: boolean, error?: string) {
  let result = Indicator.Types.default;
  if (touched && error === undefined) {
    result = Indicator.Types.success;
  } else if (touched && typeof error === 'string') {
    result = Indicator.Types.error;
  }
  return result;
}
