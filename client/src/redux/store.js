import { combineReducers, configureStore } from '@reduxjs/toolkit'
import alertReducer from "./alertReducer"


const store = configureStore({
    reducer: {
        alerts: alertReducer
    }
})

export default store;