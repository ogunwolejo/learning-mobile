import { createAsyncThunk } from '@reduxjs/toolkit'
import {REACT_APP_BASE_URL} from '@env'
import { TLogin, TRegister } from '../../interface/thunck.interface'
import axios from 'axios'

const API = REACT_APP_BASE_URL


export const loginThunck = createAsyncThunk(
    'users/login',
    async (arg:TLogin, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API}/auth/login`, {
                password:arg.password, 
                email:arg.email,

            })
            return response.data
        } catch (error:any) {
           
            return rejectWithValue(error.response.data)
        }
    }
)


export const registerThunck = createAsyncThunk(
    'users/register',
    async (arg:TRegister, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API}/auth/register`, {
                password:arg.password, 
                email:arg.email,
                fullName:arg.fullName
            })
            console.log('register', response.data)
            return response.data
        } catch (error:any) {
            console.log("ERROR",  error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// get the list of categories
export const getCategoriesThunck = createAsyncThunk(
    'catgegories',
    async (arg:null, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/app/categories`, {headers:{}})
            return response.data
        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }
)


// get course
export const getCourseThunck = createAsyncThunk(
    'courses',
    async (subjectId:string, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API}/app/topics-in-subject`, {
                subjectId
            })
            return response.data
        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }
)