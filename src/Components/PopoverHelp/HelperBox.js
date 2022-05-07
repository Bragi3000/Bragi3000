import HelperBoxView from './HelperBoxView.js';
import {changePosition} from "../../Store/slices/helper";
import {useDispatch} from "react-redux";

/**
 * Helper box which is displayed over the element.
 * @param helperText text to be displayed
 * @param helperImg (optional) image to be displayed
 */
const HelperBox = function ({helperText, helperImg}) {

  const dispatch = useDispatch();
  const nextHelp = () => dispatch(changePosition(1));
  const prevHelp = () => dispatch(changePosition(-1));

  return <HelperBoxView helperText={helperText} helperImg={helperImg} nextHelp={nextHelp} prevHelp={prevHelp}/>;
}

export default HelperBox;
