import PopoverHelpView from "./PopoverHelpView";
import { useSelector } from "react-redux";
import {
  selectCurrentHelpPopover,
} from "Store/slices/helper";

/**
 * View for the help popover
 * @param helperText text to be displayed in the popover box.
 * @param name to determine in which order the popovers are displayed.
 * @param vertical position of the popover box (top, bottom, center).
 * @param horizontal position of the popover box (left, right, center).
 * @param helperImg (optional) image to be displayed in the popover box.
 * @param active (optional) if the popover is active or not.
 * @param children wrapped elements where to display the popover over
 */
const PopoverHelp = function ({
  helperText,
  helperHeading,
  vertical,
  horizontal,
  helperImg,
  name,
  children,
}) {
  const active = useSelector(selectCurrentHelpPopover) === name;
  return (
    <PopoverHelpView
      helperText={helperText}
      helperHeading={helperHeading}
      helperImg={helperImg}
      vertical={vertical}
      horizontal={horizontal}
      active={active}
      children={children}
    />
  );
};
export default PopoverHelp;
