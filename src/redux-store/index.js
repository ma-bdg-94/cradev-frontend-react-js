import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import userReducer from './slices/user.slice'
import navigationReducer from './slices/navigation.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    navigation: navigationReducer
  },
  devTools: true,
});

export default store;
