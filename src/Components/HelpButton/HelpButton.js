import HelpButtonView from "./HelpButtonView"
import {useDispatch} from "react-redux";
import {toggleHelpActivity} from "Store/slices/helper";

const HelpButton = function () {
  const dispatch = useDispatch();

  function toggle() {
    dispatch(toggleHelpActivity());
  }

  return (
    <HelpButtonView toggle={toggle}/>
  )
}

export default HelpButton;
