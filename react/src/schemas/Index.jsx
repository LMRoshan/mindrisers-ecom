import * as Yup from "yup";

export const SignupSchema = Yup.object({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Password is required'),
})

export const LoginSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'), // Match your backend's login min: 5
});