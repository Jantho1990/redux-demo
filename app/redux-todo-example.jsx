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
const store = redux.createStore(
  reducer,
  redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
let unsubscribe = store.subscribe(() => {
  let state = store.getState()
  document.querySelector('#app').innerHTML = state.searchText
})


store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'work'
})
store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'hark'
})
store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'faster harder'
})