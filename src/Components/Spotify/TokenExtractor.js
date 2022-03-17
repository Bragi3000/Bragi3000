

const tokenExtractor = function () {
  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce((init, item)=>{
      if (item) {
        var parts = item.split("=");
        init[parts[0]] = decodeURIComponent(parts[1]);
      }
      return init;
    }, {});
  return hash;
}

export default tokenExtractor;
