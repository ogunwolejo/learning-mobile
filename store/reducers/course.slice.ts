import { createSlice } from '@reduxjs/toolkit'
import { getCourseThunck } from './thunck'; 

export interface CourseState {
  _id:string;
  title:string;
  video:string;
  description?:string;
}

interface CourseValue {
  data:CourseState[],
  loading:boolean,

}

const initialState:CourseValue  = {
  data:[],
  loading:false
}

const CourseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(getCourseThunck.pending, (state:any, action:any) => {
      return {
        ...state,
        loading:true
      }
    })

    builder.addCase(getCourseThunck.rejected, (state:any, action:any) => {
      console.log(action.payload)
      return {
        ...state,
        
      }
    })

    builder.addCase(getCourseThunck.fulfilled, (state:any, action:any) => {
      return {
        ...state,
        data:action.payload.data,
        loading:false
      }
    })
  },
})

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } = CourseSlice.actions

export default CourseSlice.reducer