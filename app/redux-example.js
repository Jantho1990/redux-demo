const redux = require('redux')

console.log('Starting redux example')

let reducer = (state = {
    name: 'Anonymous'
  }, action) => {

  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      }
      break
    default:
      return state
  }
}
const store = redux.createStore(reducer)

console.log('currentState', store.getState())

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Josh'
})
console.log('currentState', store.getState())