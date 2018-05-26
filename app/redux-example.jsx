const redux = require('redux')

console.log('Starting redux example')

let actions = require('./actions/index')
console.log(actions)
let store = require('./store/configureStore').configure()
console.log(store)


// Subscribe to changes
let unsubscribe = store.subscribe(() => {
  let state = store.getState()

  console.log('new state', state)
  // document.querySelector('#app').innerHTML = state.name

  if (state.map.isFetching) {
    document.querySelector('#app').innerHTML = 'loading...'
  } else if (state.map.url !== undefined) {
    document.querySelector('#app').innerHTML = `<a target="_blank" href="${state.map.url}">View your location</a>`
  }
})
// unsubscribe()

store.dispatch(actions.fetchLocation())

store.dispatch(actions.changeName('Josh'))

store.dispatch(actions.addHobby('eating'))
store.dispatch(actions.addHobby('drinking'))

store.dispatch(actions.removeHobby(2))

store.dispatch(actions.addMovie('Inception', 'Thriller'))

store.dispatch(actions.addMovie('Aliens', 'Science Fiction/Horror'))

store.dispatch(actions.removeMovie(1))

store.dispatch(actions.changeName('Matt'))