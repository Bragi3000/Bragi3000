const HelperBoxView = function({helperText}) {

  return <div className="bg-green-600 overflow-hidden p-8 rounded-xl ring-2 ring-green-800 bg-green-600 shadow-lg shadow-gray-900">
    {helperText}
  </div>;
}

export default HelperBoxView;
