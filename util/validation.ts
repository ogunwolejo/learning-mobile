import {object, string, number, date, InferType} from 'yup'
import { ILogin, ISignup } from '../interface/validation.interface';

export const SignupSchema = object({
    fullName: string().trim().required('This field is empty'),
    email: string().trim().email().required('This field is empty'),
    password:string().trim().required('Password credentials are required')
});

export const LoginSchema = object({
    email: string().trim().email('A valid email is required').required('This field is empty'),
    password:string().trim().required('Password credentials are required')
});


/*export const LoginValidation = (arg:ILogin) => {
    const v = loginSchema.isValid({email:arg.email, password:arg.password});
    console.log("validate", v)
    return v
}

export const SignupValidation = (arg:ISignup) => {
    return signupSchema.isValid({fullName:arg.fullName,email:arg.email, password:arg.password});
}*/