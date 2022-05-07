import HelpModalView from "./HelpModalView";
import {useSelector} from "react-redux";
import {selectHelpActive, selectPosition} from "../../Store/slices/helper";

const HelpModal = function () {
  const helpActive = useSelector(state => selectHelpActive(state));
  const helperPos = useSelector(state => selectPosition(state));
  const isOpen = helpActive && helperPos === 0;
  return <HelpModalView isOpen={isOpen}/>
}

export default HelpModal;
