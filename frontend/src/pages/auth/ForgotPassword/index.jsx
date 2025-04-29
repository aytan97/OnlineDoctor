import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  OTPemailSchema,
  OTPpasswordSchema,
  otpSchema,
} from 'components/Schemas'
import { useDispatch } from 'react-redux'
import {
  confirmationOTP,
  resetPassword,
  sendOTPEmail,
} from 'features/slices/forgotPassword'

const ForgotPassword = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues = {
    email: '',
    otp: '',
    newPassword: '',
    repeatNewPassword: '',
  }

  const handleSendOTPEmail = (values, { setSubmitting, setFieldError }) => {
    dispatch(
      sendOTPEmail({
        email: values.email,
      })
    )
      .then((confirm) => {
        if (confirm.meta.requestStatus === 'fulfilled') {
          setEmail(values.email)
          setStep(2)
          toast.success(confirm.payload.data)
        } else {
          toast.error(confirm.payload.data.Message)
        }
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handleOTPConfirmation = (values, { setSubmitting }) => {
    dispatch(
      confirmationOTP({
        email,
        otpToken: values.otp,
      })
    )
      .then((confirm) => {
        if (confirm.meta.requestStatus === 'fulfilled') {
          setStep(3)
          toast.success(confirm.payload.data)
        } else {
          toast.error(confirm.payload)
        }
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handleResetPassword = (values, { resetForm }) => {
    if (
      email &&
      email.length > 0 &&
      values.newPassword.length > 0 &&
      values.repeatNewPassword.length > 0
    ) {
      dispatch(
        resetPassword({
          email,
          newPassword: values.newPassword,
          repeatNewPassword: values.repeatNewPassword,
        })
      ).then((confirm) => {
        if (confirm?.meta.requestStatus === 'fulfilled') {
          resetForm()
          navigate('/login')
          toast.success(confirm.payload.data)
        } else if (confirm.meta.requestStatus === 'rejected') {
          toast.error(confirm.payload)
        }
      })
    }
  }

  return (
    <div>
      <h1>
        {step === 1
          ? 'Enter Email'
          : step === 2
          ? 'Enter OTP'
          : 'Reset Password'}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={
          step === 1
            ? OTPemailSchema
            : step === 2
            ? otpSchema
            : OTPpasswordSchema
        }
        onSubmit={
          step === 1
            ? handleSendOTPEmail
            : step === 2
            ? handleOTPConfirmation
            : handleResetPassword
        }
      >
        {({ isSubmitting, errors, touched, handleChange }) => (
          <Form>
            {step === 1 && (
              <>
                <label htmlFor='email'>Email:</label>
                <Field
                  id='email'
                  type='email'
                  name='email'
                  autoComplete='email'
                />
                <button type='submit' disabled={isSubmitting}>
                  Send OTP Email
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <label htmlFor='otpConfirm'>OTP:</label>
                <Field
                  id='otpConfirm'
                  type='text'
                  name='otp'
                  autoComplete='one-time-code'
                />
                <button type='submit' disabled={isSubmitting}>
                  Confirm OTP
                </button>
              </>
            )}
            {step === 3 && (
              <>
                <label htmlFor='newPassword'>New Password:</label>
                <Field
                  id='newPassword'
                  type='password'
                  name='newPassword'
                  onChange={handleChange}
                />
                <label htmlFor='repeatedPassword'>Repeat Password:</label>
                <Field
                  id='repeatedPassword'
                  type='password'
                  name='repeatNewPassword'
                  onChange={handleChange}
                />

                <button type='submit'>Reset Password</button>
              </>
            )}
            {Object.keys(errors).length > 0 &&
              Object.keys(touched).length > 0 &&
              Object.keys(errors).map((key) => (
                <div key={key} style={{ color: 'red' }}>
                  {errors[key]}
                </div>
              ))}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ForgotPassword
