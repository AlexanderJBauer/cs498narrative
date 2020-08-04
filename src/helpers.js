export const outerHeight = (el) => {
  const style = window.getComputedStyle(el);
  return el.offsetHeight
    + window.parseInt(style.marginTop)
    + window.parseInt(style.marginBottom);
};

export const outerWidth = (el) => {
  const style = window.getComputedStyle(el);
  return el.offsetWidth
    + window.parseInt(style.marginLeft)
    + window.parseInt(style.marginRight);
};
