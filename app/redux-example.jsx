const redux = require('redux'),
      axios = require('axios')

console.log('Starting redux example')

/*
 *  Name reducer and action generators.
 */
let nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
    return action.name
    default:
    return state
  }
}

let changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
}

/*
 *  Hobbies reducer and action generators.
 */
let nextHobbyId = 1
let hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
    return [
      ...state,
      {
        id: nextHobbyId++,
        hobby: action.hobby
      }
    ]
    case 'REMOVE_HOBBY':
    return state.filter(hobby => hobby.id !== action.id)
    default:
    return state
  }
}

let addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
}

let removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}

/*
 *  Movies reducer and action generators.
 */
let nextMovieId = 1
let moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          movie: action.movie,
          genre: action.genre
        }
      ]
    case 'REMOVE_MOVIE':
      return state.filter(movie => movie.id !== action.id)
    default:
      return state
  }
}

let addMovie = (movie, genre) => {
  return {
    type: 'ADD_MOVIE',
    movie,
    genre
  }
}

let removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
}

/*
 *  Map reducer and action generators. 
 */
let mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      }
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      }
    default:
      return state
  }
}

let startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
}

let completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
}

let fetchLocation = () => {
  store.dispatch(startLocationFetch())

  axios.get('http://ipinfo.io').then(function (res) {
    let loc = res.data.loc
    let baseUrl = 'https://maps.google.com?'

    store.dispatch(completeLocationFetch(baseUrl + loc))
  })
}

/*
 *  The reducer combinator. 
 */
let reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
})

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
  // document.querySelector('#app').innerHTML = state.name

  if (state.map.isFetching) {
    document.querySelector('#app').innerHTML = 'loading...'
  } else if (state.map.url !== undefined) {
    document.querySelector('#app').innerHTML = `<a target="_blank" href="${state.map.url}">View your location</a>`
  }
})
// unsubscribe()

fetchLocation()

store.dispatch(changeName('Josh'))

store.dispatch(addHobby('eating'))
store.dispatch(addHobby('drinking'))

store.dispatch(removeHobby(2))

store.dispatch(addMovie('Inception', 'Thriller'))

store.dispatch(addMovie('Aliens', 'Science Fiction/Horror'))

store.dispatch(removeMovie(1))

store.dispatch(changeName('Matt'))