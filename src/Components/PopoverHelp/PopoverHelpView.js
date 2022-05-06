import HelperBox from './HelperBox';

const PopoverHelpView = function ({helperText, vertical, horizontal, active, children}) {

  const verticalPos = vertical === 'top' ? '-translate-y-full' : 'translate-y-full';
  const horizontalPos = horizontal === 'left' ? '-translate-x-1/8' : 'translate-x-1/8';

  return (
    <div className="flex-none h-full relative">
      {children}
      <div className={`${active ? "" : "hidden"} ${verticalPos} ${horizontalPos} absolute top-0 left-0 w-[200px]`}>
        <HelperBox helperText={helperText} />
      </div>
    </div>);
};

export default PopoverHelpView;
