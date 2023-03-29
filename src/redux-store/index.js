import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import userReducer from './slices/user.slice'

const store = configureStore({
    reducer: {
      auth: authReducer,
      users: userReducer
    },
  })

export default store
