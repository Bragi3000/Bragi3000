import HelpButtonView from "./HelpButtonView"
import {useDispatch, useSelector} from "react-redux";
import {selectPosition, changePosition, toggleHelpActivity, selectHelpActive} from "Store/slices/helper";
import {useEffect} from "react";

const HelpButton = function () {
  const helpActive = useSelector(state => selectHelpActive(state));
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.addEventListener("keydown", handleHelperPosition);
    return () => document.body.removeEventListener("keydown", handleHelperPosition);
  }, [])

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
