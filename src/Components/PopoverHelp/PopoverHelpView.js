import HelperBox from './HelperBox';

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
    verticalPos = '';
  }

  switch (horizontal) {
  case 'left':
    horizontalPos = '-left-[120px]';
    break;
  case 'right':
    horizontalPos = '';
    break;
  default:
    horizontalPos = '';
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
