import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './redux/userApi';
import { taskApi } from './redux/taskApi';
import userSlice from './redux/userSlice';
import { withdrawApi } from './redux/withdrawApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [withdrawApi.reducerPath]: withdrawApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,taskApi.middleware,withdrawApi.middleware),
});
