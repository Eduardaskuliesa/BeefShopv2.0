import * as yup from 'yup';

const registerValidationSchema = yup.object({
    email: yup.string()
        .required('email is required')
        .email('incorrect email format'),

    password: yup.string()
        .required('password is required')
        .min(2, 'password must have at least 2 symbols')
        .max(32, 'password can\'t have more than 32 symbols'),

    passwordConfirmation: yup.string()
        .required('password must be confirmed')
        .oneOf([yup.ref('password')], 'passowords must match'),

    name: yup.string()
        .required('name is required')
        .min(2, 'name must have at least 2 symbols')
        .max(32, 'name can\'t have more than 32 symbols'),
}).strict(true);

const loginValidationSchema = yup.object({
    email: yup.string()
    .required('email is required')
    .email('incorrect email format'),

    password: yup.string()
    .required('password is required')
    .min(2, 'password must have at least 2 symbols')
    .max(32, 'password can\'t have more than 32 symbols'),
});

const AuthValidation = {
    registerValidationSchema,
    loginValidationSchema,
};

export default AuthValidation;
