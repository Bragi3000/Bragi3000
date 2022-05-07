import PopoverHelpView from "./PopoverHelpView";
import {useSelector} from "react-redux";
import {selectHelpActive, selectPosition} from "Store/slices/helper";


const PopoverHelp = function ({helperText, vertical, horizontal, helperImg, number, children}) {
  const helpActive = useSelector(state => selectHelpActive(state));
  const helperPos = useSelector(state => selectPosition(state));
  const active = helpActive && helperPos === number;
  return <PopoverHelpView helperText={helperText} helperImg={helperImg} vertical={vertical} horizontal={horizontal} active={active} children={children} />
}
export default PopoverHelp;
