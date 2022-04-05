import { createSlice } from '@reduxjs/toolkit'

export const track = createSlice({
  name: 'track',
  initialState: {
   tracks : [],
   modalTrack : {},
   selectTrack : []
  },
  reducers: {
    setTrack : (state, action) => {
        state.tracks = action.payload
    },
    setModalTrack : (state, action) => {
        state.modalTrack = action.payload
    },
    setSelectTrack: (state, action) => {
        state.selectTrack= action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTrack, setModalTrack, setSelectTrack  } = track.actions

export default track.reducer