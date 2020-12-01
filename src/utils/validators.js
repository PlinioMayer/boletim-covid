function onlyNumbers(string) {
  if (typeof string === 'number') {
    string = string.toString();
  }
  
  return string.match('\\d+') ? true : false;
}

function moneyValidator(string) {
  return string.match('\\d+,\\d\\d') ? true : false;
}

function notNull(string) {
  return string ? true : false;
}

export { onlyNumbers, notNull, moneyValidator };