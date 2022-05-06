import HelpButtonView from "./HelpButtonView"
import {useDispatch} from "react-redux";
import {selectPosition, changePosition, toggleHelpActivity} from "Store/slices/helper";

const HelpButton = function () {
  const dispatch = useDispatch();

  function toggle() {
    dispatch(toggleHelpActivity());
  }

  function handleHelperPosition(event) {
    if ([37, 39].includes(event.keyCode)) {
      const number = event.keyCode === 39 ? 1 : -1;
      dispatch(changePosition(number));
    }

  }

  document.body.addEventListener("keydown", handleHelperPosition);

  return (
    <HelpButtonView toggle={toggle}/>
  )
}

export default HelpButton;
