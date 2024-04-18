import * as Yup from 'yup';

const phoneRegExp = /^[6-9]{1}[0-9]{9}$/;

export const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is Required'),
  password: Yup.string()
    .min(6, 'Atleast 6 charactor!!')
    .required('Password is required!!'),
});
export const phoneSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is Required'),
});
export const resetPassword = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Atleast 6 charactor!!')
    .required('Password is required!!'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password'),
});
export const registerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is Required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is Required'),
  password: Yup.string()
    .min(6, 'Atleast 6 charactor!!')
    .required('Password is required!!'),
  conf_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password'),
  name: Yup.string()
    .min(3, 'Atleast 3 charactor!!')
    .required('Name is required!!'),
  // state: Yup.mixed().required('State is required!!'),
  // country: Yup.mixed().required('Country is required!!'),
  // city: Yup.mixed().required('City is required!!'),
});
export const updatePasswordSchema = Yup.object().shape({
  old_password: Yup.string()
    .min(6, 'Atleast 6 charactor!!')
    .required('Old Password is required!!'),
  password: Yup.string()
    .min(6, 'Atleast 6 charactor!!')
    .required('Password is required!!'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password'),
});
export const profileInformationSchema = Yup.object().shape({
  name: Yup.string().required('Name is Required'),
  email: Yup.string().email('Invalid Email').required('Email is Required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is Required'),
  address: Yup.string().required('Address is Required'),
  // state: Yup.mixed().required('State is Required'),
  // city: Yup.string().required('City is Required'),
  pincode: Yup.string().required('Pin Code is Required'),
});
export const bankSchema = Yup.object().shape({
  bank_name: Yup.string().required('Bank Name is Required'),
  account_number: Yup.string().required('Account Number is Required'),
  ifsc: Yup.string().required('IFSC Code is Required'),
  account_holder_name: Yup.string().required('Account Name is Required'),
});
export const contactFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is Required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is Required'),
  email: Yup.string().email('Invalid Email').required('Email is Required'),
  message: Yup.string().required('Message is Required'),
});
export const nomineeSchema = Yup.object().shape({
  nominee: Yup.string().required('Nominee Name is Required'),
});
export const amountSchema = Yup.object().shape({
  amount: Yup.string().required('Amount is Required'),
});
