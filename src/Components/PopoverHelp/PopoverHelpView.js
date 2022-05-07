import HelperBox from './HelperBox';

/**
 * View for the help popover
 * @param helperText text to be displayed in the popover box.
 * @param helperHeading
 * @param vertical position of the popover box (top, bottom, center).
 * @param horizontal position of the popover box (left, right, center).
 * @param helperImg (optional) image to be displayed in the popover box.
 * @param active (optional) if the popover is active or not.
 * @param children wrapped elements where to display the popover over
 */
const PopoverHelpView = function ({helperText, helperHeading, vertical, horizontal, helperImg, active, children}) {
  let horizontalPos, verticalPos;

  switch (vertical) {
  case "top":
    verticalPos = "-translate-y-full -top-2 ";
    break;
  case "bottom":
    verticalPos = "translate-y-full -bottom-2 ";
    break;
  default:
    verticalPos = "translate-y-center -top-16";
  }

  switch (horizontal) {
  case 'middle':
    horizontalPos = '-left-[110px] w-[250px]';
    break;
  case 'right':
    horizontalPos = 'w-[250px]';
    break;
  default:
    horizontalPos = '';
  }

  return (
    <div className="h-full relative">
      {children}
      <div className={`transition-all duration-100 ${active ? "opacity-100" : "opacity-0"} ${verticalPos} ${horizontalPos} absolute z-50`}>
        <HelperBox helperText={helperText} helperHeading={helperHeading} helperImg={helperImg}/>
      </div>
    </div>);
};

export default PopoverHelpView;
