import HelpModalView from "./HelpModalView";
import { useDispatch, useSelector } from "react-redux";
import {
  changePosition,
  selectCurrentHelpPopover,
  toggleHelpActivity,
} from "../../Store/slices/helper";
import { HELP_START } from "Constants/helpPopovers";

/**
 * Modal to display when help is initially clicked.
 */
const HelpModal = function () {
  const dispatch = useDispatch();
  const currHelper = useSelector(selectCurrentHelpPopover);
  const closeHelp = () => dispatch(toggleHelpActivity());
  const nextHelp = () => dispatch(changePosition(1));
  return (
    <HelpModalView
      isOpen={currHelper === HELP_START}
      closeHelp={closeHelp}
      nextHelp={nextHelp}
    />
  );
};

export default HelpModal;
