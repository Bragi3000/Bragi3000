import HelpButtonView from "./HelpButtonView"
import {useDispatch, useSelector} from "react-redux";
import { changePosition, toggleHelpActivity, selectCurrentHelpPopover} from "Store/slices/helper";
import {useEffect} from "react";

const HelpButton = function () {
  const helpActive = useSelector(selectCurrentHelpPopover) !== null;
  const dispatch = useDispatch();

  /* eslint-disable */
  useEffect(() => {
    document.body.addEventListener("keydown", handleHelperPosition);
    return () => document.body.removeEventListener("keydown", handleHelperPosition);
  }, [])
  /* eslint-enable */

  function toggle() {
    dispatch(toggleHelpActivity());
  }

  function handleHelperPosition(event) {
    if ([37, 39].includes(event.keyCode)) {
      const number = event.keyCode === 39 ? 1 : -1;
      dispatch(changePosition(number));
    }

  }


  return (
    <HelpButtonView
      text={helpActive ? "" : "Help"}
      toggle={toggle}/>
  )
}

export default HelpButton;
