import HelperBox from './HelperBox';

/**
 * View for the help popover
 * @param helperText text to be displayed in the popover box.
 * @param vertical position of the popover box (top, bottom, center).
 * @param horizontal position of the popover box (left, right, center).
 * @param helperImg (optional) image to be displayed in the popover box.
 * @param active (optional) if the popover is active or not.
 * @param children wrapped elements where to display the popover over
 */
const PopoverHelpView = function ({helperText, vertical, horizontal, helperImg, active, children}) {

  let verticalPos, horizontalPos;

  switch (vertical) {
  case 'top':
    verticalPos = '-translate-y-full';
    break;
  case 'bottom':
    verticalPos = 'translate-y-full';
    break;
  default:
    verticalPos = 'top-1/2 -translate-y-1/2';
  }

  switch (horizontal) {
  case 'left':
    horizontalPos = '-left-[120px]';
    break;
  case 'right':
    horizontalPos = '';
    break;
  default:
    horizontalPos = 'left-[50%] -translate-x-1/2';
  }

  return (
    <div className="flex-none h-full relative">
      {children}
      <div className={`${active ? "" : "hidden"} ${verticalPos} ${horizontalPos} absolute -top-1 w-[250px] z-50`}>
        <HelperBox helperText={helperText} helperImg={helperImg}/>
      </div>
    </div>);
};

export default PopoverHelpView;
