import * as Yup from "yup";

export const SignupSchema = Yup.object({
    username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
})