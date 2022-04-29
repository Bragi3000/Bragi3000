/**
 * Tiny utility to convert a list of class strings into a single class string
 * @param  {...string?} classes List of class strings (possibly nested); falsey values will be filtered out
 * @returns Concatenated class string
 */
const cx = (...classes) =>
  classes
    .flat(Infinity)
    .filter((c) => c)
    .join(" ");

export default cx;
