import * as yup from 'yup'
import Category from '../network/models/Category';


const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
export const signupAsPatientSchema = yup.object().shape({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup
        .string()
        .email('Invalid email')
        .test('email-validation', 'Email is not valid', function (value) {
            return emailRegex.test(value || '');
        })
        .required('Email is required'),
    age: yup.number().required('Age is required').typeError('Age must be a number').positive('Age must be a positive number').integer('Age must be an integer').min(18, 'Age must be at least 18'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
            'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character'
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    role: yup.string().optional()
});

export const signupAsDoctorSchema = yup.object().shape({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().required('Email is required').email('Invalid email'),
    categories: yup.array<Category>().min(1, 'At least one category is required'),
    ssnId: yup.string().required('FIN ID is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
            'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character'
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    role: yup.string().optional()
});


export const otpSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    otp: yup.string().required('OTP is required'),
})

export const loginSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
})


export const feedBackSchema = yup.object({
    id: yup.string().optional(),
    email: yup.string().optional(),
    questionText: yup.string().optional(),
    commentText: yup.string().optional(),
})

export const blogSchema = yup.object({
    categoryId: yup.string().required('Category is required'),
    title: yup.string().required("Required"),
    description: yup.string().required('Description is required'),
    image: yup.string().optional(),
    img: yup.string().optional(),
    body: yup.string().required("Blog content is required"),
    tags: yup.array().of(
        yup.string().required('Enter a tag for easy search result')
    )
});


export const myProfileSchema = yup.object({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    categories: yup.array<Category>(),
    languageSkills: yup.array().of(yup.string()).optional(),
    age: yup.number().optional().typeError('Age must be a number').positive('Age must be a positive number').integer('Age must be an integer').min(18, 'Age must be at least 18'),
    phoneNumber: yup.string().optional().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Invalid phone number'),
    workExperience: yup.string().optional(),
    currentWorkHospital: yup.string().optional(),
    biography: yup.string().optional(),
    image: yup.string().optional(),
});

export const ProfilePicSchema = yup.object({
    image: yup.string().optional(),
})


export const paymentSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    cardNumber: yup.string().required("Card number is required")
        .matches(/^[0-9]{16}$/, 'Invalid card number')
        .transform((originalValue) => {
            const cleanedValue = originalValue.replace(/\D/g, '');
            return cleanedValue;
        })
    ,
    cvc: yup
        .string()
        .matches(/^\d{3,4}$/, 'Invalid CVC/CVV')
        .required('CVC/CVV is required'),
    expiryDate: yup
        .string()
        .required('Expiry date is required')
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Invalid expiry date')
        .test('expiryDate', 'Invalid expiry date', (value) => {
            if (!value) return true;

            const [month, year] = value.split('/');
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            return parseInt(year) > currentYear || (parseInt(year) === currentYear && parseInt(month) >= currentMonth);
        })

});
