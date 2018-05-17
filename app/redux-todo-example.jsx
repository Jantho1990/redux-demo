const redux = require('redux')

console.log('Starting redux example')

let initialState = {
  searchText: '',
  showCompleted: false,
  todos: [],
}
let reducer = (state = initialState, action) => {
  return state
}
const store = redux.createStore(reducer)

let currentState = store.getState()

console.log('currentState', currentState)