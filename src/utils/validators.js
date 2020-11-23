function onlyNumbers(string) {
  return string.match('\\d+') ? true : false;
}

function notNull(string) {
  return string ? true : false;
}

export { onlyNumbers, notNull };