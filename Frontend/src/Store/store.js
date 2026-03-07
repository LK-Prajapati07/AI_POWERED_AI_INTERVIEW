import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import rootReducer from './rootReducer'

export const store=configureStore({
    reducer:rootReducer
})