export const encodeString = (str) =>
  window.btoa(unescape(encodeURIComponent(str)));

export const decodeString = (str) =>
  decodeURIComponent(escape(window.atob(str)));
