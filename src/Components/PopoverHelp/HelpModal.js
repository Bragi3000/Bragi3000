import HelpModalView from "./HelpModalView";
import {useDispatch, useSelector} from "react-redux";
import {selectHelpActive, selectPosition, toggleHelpActivity} from "../../Store/slices/helper";

const HelpModal = function () {
  const dispatch = useDispatch()
  const helpActive = useSelector(state => selectHelpActive(state));
  const helperPos = useSelector(state => selectPosition(state));
  const closeHelp = () => dispatch(toggleHelpActivity());
  const isOpen = helpActive && helperPos === 0;
  return <HelpModalView isOpen={isOpen} closeHelp={closeHelp}/>
}

export default HelpModal;
