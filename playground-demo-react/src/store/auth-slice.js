import { createSlice } from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem("user"))

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        isLoggedIn:false,
        email:'',
        password:''
    },
    reducers:{
        login(state, payload){
            console.log(payload)
            state.isLoggedIn = true
        },
        logout(state){
            state.isLoggedIn = false
        }
    }
})

export const authActions = authSlice.actions
export default authSlice