import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './store/Auth'
import UserReducer from './store/User'
import PlaylistReducer from './store/Playlist'
import TracksReducer from './store/Tracks'
export default configureStore({
  reducer: {
      Auth : AuthReducer,
      User : UserReducer,
      Playlist : PlaylistReducer,
      Track : TracksReducer
  },
})