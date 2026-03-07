import { combineReducers } from "@reduxjs/toolkit"
import authReducer, { logoutUser } from "./authSlice";

const appReducer=combineReducers({
    auth:authReducer
})
const rootReducer=(state,action)=>{
    if(action.type===logoutUser.type){
        state=undefined
    }
    return appReducer(state,action)

}
export default rootReducer