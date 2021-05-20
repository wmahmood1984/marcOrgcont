import { adopreducer } from './adoptSlice'


import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
export const store = configureStore({
    reducer : {
        adoptReducer : adopreducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck:false,
        
    })
})