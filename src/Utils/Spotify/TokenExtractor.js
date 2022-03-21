const tokenExtractor = function () {
  const paramString = window.location.hash.substring(1);
  const params = new URLSearchParams(paramString);

  return Object.fromEntries(params);
}

export default tokenExtractor;
