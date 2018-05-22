const redux = require('redux')

console.log('Starting redux example')

let stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: [],
  hobbyId: 0,
  movieId: 0
}
// let nextHobbyId = 1
// let nextMovieId = 1

let reducer = (state = stateDefault, action) => {

  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbyId: ++state.hobbyId,
        hobbies: [
          ...state.hobbies,
          {
            id: state.hobbyId,
            hobby: action.hobby
          }
        ],
      }
    case 'REMOVE_HOBBY':
      return {
        ...state,
        hobbies: state.hobbies.filter(hobby => hobby.id !== action.id)
      }
    case 'ADD_MOVIE':
      return {
        ...state,
        movieId: ++state.movieId,
        movies: [
          ...state.movies,
          {
            id: state.movieId,
            movie: action.movie,
            genre: action.genre
          }
        ],
      }
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter(movies => movies.id !== action.id)
      }
    default:
      return state
  }
}
const store = redux.createStore(
  reducer,
  redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

// Subscribe to changes
let unsubscribe = store.subscribe(() => {
  let state = store.getState()

  console.log('new state', state)
  document.querySelector('#app').innerHTML = state.name
})
// unsubscribe()

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Josh'
})

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'eating'
}
)
store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'drinking'
})

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
})

store.dispatch({
  type: 'ADD_MOVIE',
  movie: 'Inception',
  genre: 'Thriller'
})

store.dispatch({
  type: 'ADD_MOVIE',
  movie: 'Aliens',
  genre: 'Science Fiction/Horror'
})

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
})

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Matt'
})