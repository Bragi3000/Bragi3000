import {
  ArrowSquareRight,
  ArrowSquareLeft,
  XCircle,
} from "phosphor-react";
/**
 * View for the helper box which is displayed over the element.
 * @param helperText text to be displayed
 * @param helperHeading heading of the helper box
 * @param helperImg (optional) image to be displayed
 * @param nextHelp function go to next help
 * @param prevHelp function go to previous help
 * @param closeHelp function go to close help
 */
const HelperBoxView = function({helperText,helperHeading , helperImg, nextHelp, prevHelp, closeHelp}) {
  return (<div className="bg-green-600 text-[#000] text-l overflow-hidden text-left p-4 rounded-lg bg-green-600 fade-in">
    <h3 className="text-xl font-semibold pb-2 text-center">{helperHeading}</h3>
    {helperText}
    {helperImg && <img className="pt-3 w-full" src={helperImg} alt=""/>}
    <div className="flex justify-between pt-3 text-4xl">
      <ArrowSquareLeft onClick={prevHelp} className="hover:scale-110 max-w-[40px]"/>
      <XCircle onClick={closeHelp} className="hover:scale-110 max-w-[40px]"/>
      <ArrowSquareRight onClick={nextHelp} className="hover:scale-110 max-w-[40px]"/>
    </div>
  </div>);
}

export default HelperBoxView;
