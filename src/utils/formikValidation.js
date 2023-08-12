import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^\S*$/, "First name cannot contain spaces")
    .min(3)
    .max(15)
    .required("Enter First Name"),
  lastName: yup
    .string()
    .matches(/^\S*$/, "Last name cannot contain spaces")
    .min(3)
    .max(15)
    .required("Enter Last Name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Enter Email"),
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        "Minimum of 6 characters, 1 uppercase, 1 lowercase, 1 numeric digit",
    })
    .min(6)
    .required("Enter password"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Confirm Password"),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Enter Email"),
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        "Minimum of 6 characters, 1 uppercase, 1 lowercase, 1 numeric digit",
    })
    .min(6)
    .required("Enter password"),
});

export const updateSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^\S*$/, "First name cannot contain spaces")
    .min(3)
    .max(15)
    .required("Enter First Name"),
  lastName: yup
    .string()
    .matches(/^\S*$/, "Last name cannot contain spaces")
    .min(3)
    .max(15)
    .required("Enter Last Name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Enter Email"),
});

export const changeSchema = yup.object().shape({
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        "Minimum of 6 characters, 1 uppercase, 1 lowercase, 1 numeric digit",
    })
    .min(6)
    .required("Enter old password"),
  newPassword: yup
    .string()
    .matches(passwordRules, {
      message:
        "Minimum of 6 characters, 1 uppercase, 1 lowercase, 1 numeric digit",
    })
    .min(6)
    .required("Enter new password"),
  confirm: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Password must match")
    .required("Confirm Password"),
});

export const forgetSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Enter Email"),
});

export const verifySchema = yup.object().shape({
  code: yup
    .string()
    .matches(/^\S*$/, "OTP cannot contain spaces")
    .min(6)
    .max(6)
    .required("Enter OTP sent to your email"),
});

export const resetSchema = yup.object().shape({
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        "Minimum of 6 characters, 1 uppercase, 1 lowercase, 1 numeric digit",
    })
    .min(6)
    .required("Enter password"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Confirm Password"),
});

export const reviewValidation = yup.object().shape({
  title: yup
    .string()
    .min(5)
    .max(50)
    .required("Please give your review a title"),
  body: yup.string().min(100).required("Give a review on this product"),
});

export const shippingValidation = yup.object().shape({
  fullName: yup.string().min(5).max(30).required("Enter Full Name"),
  address: yup.string().required("Enter Address"),
  city: yup.string().required("Enter city of residence"),
  postal: yup
    .string()
    .min(6, "Enter a valid postal code")
    .max(6, "Enter a valid postal code")
    .required("Enter Full Name"),
  country: yup.string().required("Enter Country"),
});

export const paymentValidation = yup.object().shape({
  payment: yup.string().required("Please select a payment method"),
})
