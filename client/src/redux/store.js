import { configureStore } from '@reduxjs/toolkit'
import alertReducer from "./alertReducer"
import userReducer from "./userReducer"


const store = configureStore({
    reducer: {
        alerts: alertReducer,
        user: userReducer
    }
})

export default store;