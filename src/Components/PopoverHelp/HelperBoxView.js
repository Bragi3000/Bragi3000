/**
 * View for the helper box which is displayed over the element.
 * @param helperText text to be displayed
 * @param helperImg (optional) image to be displayed
 * @param nextHelp
 * @param prevHelp
 */
const HelperBoxView = function({helperText, helperImg, nextHelp, prevHelp}) {
  return (<div className="bg-green-600 text-[#000] text-l overflow-hidden p-4 rounded-xl ring-2 ring-green-800 bg-green-600 shadow-lg shadow-gray-900">
    {helperText}
    {helperImg && <img className="pt-2 w-full rounded-2xl" src={helperImg} alt=""/>}
    <div className="flex justify-between pt-2 text-4xl font-semibold">
      <span onClick={prevHelp} className="">
        &#60;
      </span>
      <span onClick={nextHelp}>
        &#62;
      </span>
    </div>
  </div>);
}

export default HelperBoxView;
