import { createSlice } from '@reduxjs/toolkit'

export const playlist = createSlice({
  name: 'playlist',
  initialState: {
   playlist : [],
  },
  reducers: {
    setPlaylist : (state, action) => {
        state.playlist = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPlaylist } = playlist.actions

export default playlist.reducer