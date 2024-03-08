import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const activeUserSlice = createSlice({
  name: 'activeuser',
  initialState,
  reducers: {
    activeuser: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { activeuser  } = activeUserSlice.actions

export default activeUserSlice.reducer