import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./apiSlice.tsx";

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})