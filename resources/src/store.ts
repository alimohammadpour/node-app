import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import signupReducer from "./slices/signupSlice";
import profileReducer from "./slices/profileSlice";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        signup : signupReducer,
        profile: profileReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
