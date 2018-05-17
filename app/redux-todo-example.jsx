const redux = require('redux')

console.log('Starting redux example')

let initialState = {
  searchText: '',
  showCompleted: false,
  todos: [],
}
let reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      }
      break
    default:
      return state
  }

}
const store = redux.createStore(reducer)

console.log('currentState', store.getState())

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'work'
})
console.log('currentState', store.getState())