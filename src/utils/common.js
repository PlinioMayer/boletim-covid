function handleByValue(handler) {
  return function (event) {
    handler(event.target.value);
  }
}

function toggleReducer(state) {
  return !state;
}

function reducer(state, action) {
  return action;
}

export {
  handleByValue,
  toggleReducer,
  reducer
}
