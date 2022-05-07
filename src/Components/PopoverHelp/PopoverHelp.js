import PopoverHelpView from "./PopoverHelpView";
import {useSelector} from "react-redux";
import {selectHelpActive, selectPosition} from "Store/slices/helper";

/**
 * View for the help popover
 * @param helperText text to be displayed in the popover box.
 * @param number to determine in which order the popovers are displayed.
 * @param vertical position of the popover box (top, bottom, center).
 * @param horizontal position of the popover box (left, right, center).
 * @param helperImg (optional) image to be displayed in the popover box.
 * @param active (optional) if the popover is active or not.
 * @param children wrapped elements where to display the popover over
 */
const PopoverHelp = function ({helperText, vertical, horizontal, helperImg, number, children}) {
  const helpActive = useSelector(state => selectHelpActive(state));
  const helperPos = useSelector(state => selectPosition(state));
  const active = helpActive && helperPos === number;
  return <PopoverHelpView helperText={helperText} helperImg={helperImg} vertical={vertical} horizontal={horizontal} active={active} children={children} />
}
export default PopoverHelp;
