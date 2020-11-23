function handleByValue(handler) {
  return function (event) {
    handler(event.target.value);
  }
}

export {
  handleByValue
}
