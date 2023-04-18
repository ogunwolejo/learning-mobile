import { createSlice } from '@reduxjs/toolkit'
import { getCategoriesThunck } from './thunck';

export interface ICategory {
  _id: string;
  category: string
}

interface CategoryState {
  list: [] | ICategory[];
  loading: boolean;
  error:any
}

const initialState: CategoryState = {
  list: [],
  loading: false,
  error:null
}

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategory: (state:any, action:any) =>  {
      return {
        ...state,
        list:action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunck.pending, (state: any, action: any) => {
      return {
        ...state,
        loading: true
      }
    })

    builder.addCase(getCategoriesThunck.rejected, (state: any, action: any) => {
      return {
        ...state,
        error:action.payload,
        loading:false
      }  
    })

    builder.addCase(getCategoriesThunck.fulfilled, (state: any, action: any) => {
      return {
        ...state,
        list:action.payload.data,
        loading:false
      }
    })
  },
})

// Action creators are generated for each case reducer function
export const { fetchCategory } = CategorySlice.actions

export default CategorySlice.reducer