import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { loginThunck, registerThunck, verifyToken } from './thunck';

export interface AuthState {
  id:string;
  token:string;
  fullName:string,
  loading:false,
  error:string
}

const initialState: AuthState = {
  id:"",
  token:"",
  fullName:"",
  loading:false,
  error:''
}

const AuthSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
      builder.addCase(loginThunck.pending, (state:any, action:any) => {
        return {
          ...state,
          loading:true
        }
      })

      builder.addCase(loginThunck.rejected, (state:any, action:any) => {
        return {
          ...state,
          error:action.payload,
          loading:false
        }
      })

      builder.addCase(loginThunck.fulfilled, (state:any, action:any) => {
        return {
          ...state,
          token:action.payload.data.token,
          id:action.payload.data.id,
          fullName:action.payload.data.fullName,
          loading:false,
          error:null
        }
      })

      // register

      builder.addCase(registerThunck.pending, (state:any, action:any) => {
        return {
          ...state,
          loading:true
        }
      })

      builder.addCase(registerThunck.rejected, (state:any, action:any) => {
        return {
          ...state,
          error:action.payload.status,
          loading:false
        }
      })

      builder.addCase(registerThunck.fulfilled, (state:any, action:any) => {
        return {
          ...state,
          token:action.payload.data.token,
          id:action.payload.data.id,
          fullName:action.payload.data.fullName,
          loading:false
        }
      })

      // verification of token

      builder.addCase(verifyToken.pending, (state:any, action:any) => {
        return {
          ...state,
          loading:true
        }
      })

      builder.addCase(verifyToken.rejected, (state:any, action:any) => {
        return {
          ...state,
          error:action.payload.status,
          loading:false
        }
      })

      builder.addCase(verifyToken.fulfilled, (state:any, action:any) => {
        return {
          ...state,
          id:action.payload.data.verified.id,
          fullName:action.payload.data.verified.fullName,
          loading:false
        }
      })
  },
})

// Action creators are generated for each case reducer function
//export const { } = AuthSlice.actions

export default AuthSlice.reducer