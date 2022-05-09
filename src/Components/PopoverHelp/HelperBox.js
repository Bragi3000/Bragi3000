import HelperBoxView from './HelperBoxView.js';
import {changePosition, toggleHelpActivity} from "../../Store/slices/helper";
import {useDispatch} from "react-redux";

/**
 * Helper box which is displayed over the element.
 * @param helperText text to be displayed
 * @param helperHeading To heading of the helper box
 * @param helperImg (optional) image to be displayed
 */
const HelperBox = function ({helperText, helperHeading, helperImg}) {

  const dispatch = useDispatch();
  const nextHelp = () => dispatch(changePosition(1));
  const prevHelp = () => dispatch(changePosition(-1));
  const closeHelp = () => dispatch(toggleHelpActivity());

  return <HelperBoxView helperText={helperText} helperHeading={helperHeading} helperImg={helperImg}
    nextHelp={nextHelp} prevHelp={prevHelp} closeHelp={closeHelp}/>;
}

export default HelperBox;
