const redux = require('redux')

console.log('Starting redux example')

let reducer = (state = {
    name: 'Anonymous'
  }, action) => {
  return state
}
const store = redux.createStore(reducer)

let currentState = store.getState()

console.log('currentState', currentState)