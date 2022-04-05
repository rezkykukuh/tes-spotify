import { createSlice } from '@reduxjs/toolkit'

export const auth = createSlice({
  name: 'auth',
  initialState: {
   token: "",

  },
  reducers: {
    setToken : (state, action) => {
    
        state.token = action.payload
      },
  }

})

// Action creators are generated for each case reducer function
export const { setToken } = auth.actions

export default auth.reducer