import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa'; // Corrected import from 'react-icons/fa6'

interface SignupFormProps {
  close: () => void;
  open: () => void;
}

// Regular expression to allow only letters (no numbers or special characters)
const lettersOnlyRegex = /^[A-Za-z]+$/;

const SignupForm: React.FC<SignupFormProps> = ({ close, open }) => {
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1); // Corrected useState type

  // Validation schemas for different steps
  const stepOneValidationSchema = Yup.object({
    fname: Yup.string()
      .matches(lettersOnlyRegex, 'First name must contain only letters')
      .required('First name is required'),
    lname: Yup.string()
      .matches(lettersOnlyRegex, 'Last name must contain only letters')
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const stepTwoValidationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be numeric')
      .min(10, 'Phone number must be at least 10 digits')
      .required('Phone number is required'),
  });

  const stepThreeValidationSchema = Yup.object({
    province: Yup.string()
      .matches(lettersOnlyRegex, 'Province must contain only letters')
      .required('Province is required'),
    state: Yup.string()
      .matches(lettersOnlyRegex, 'State must contain only letters')
      .required('State is required'),
    district: Yup.string()
      .matches(lettersOnlyRegex, 'District must contain only letters')
      .required('District is required'),
    postal_code: Yup.string()
      .matches(/^[0-9]+$/, 'Postal code must be numeric')
      .required('Postal code is required'),
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <FaTimes
        onClick={close}
        tabIndex={0}
        role="button"
        aria-label="Close"
        onKeyDown={(e) => { if (e.key === 'Enter') close(); }}
        style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
      />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>

        <Formik
          initialValues={{
            fname: '',
            lname: '',
            email: '',
            password: '',
            phoneNumber: '',
            province: '',
            state: '',
            district: '',
            postal_code: '',
          }}
          validationSchema={
            step === 1 ? stepOneValidationSchema
              : step === 2 ? stepTwoValidationSchema
              : stepThreeValidationSchema
          }
          onSubmit={async (values, { setSubmitting }) => {
            if (step < 3) {
              setStep(step + 1);
              setSubmitting(false);
            } else {
              // Handle final submission
              setError(null);
              try {
                const response = await axios.post('http://localhost:3001/api/signup', {
                  fname: values.fname,
                  lname: values.lname,
                  email: values.email,
                  password: values.password,
                  phoneNumber: values.phoneNumber,
                  address: {
                    province: values.province,
                    state: values.state,
                    district: values.district,
                    postal_code: values.postal_code,
                  }
                });
                console.log(response.data);
                setError('Signup successful!');
                close()
                open()
              } catch (error) {
                console.error(error);
                setError('Signup failed. Please try again.');
              } finally {
                setSubmitting(false);
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {step === 1 && (
                <>
                  {/* Step 1: Basic Information */}
                  <div>
                    <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <Field
                      name="fname"
                      type="text"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage name="fname" component="div" className="text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="lname" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <Field
                      name="lname"
                      type="text"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage name="lname" component="div" className="text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage name="email" component="div" className="text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage name="password" component="div" className="text-sm text-red-600" />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    disabled={isSubmitting}
                  >
                    Next
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  {/* Step 2: Phone Information */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <Field
                      name="phoneNumber"
                      type="text"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage name="phoneNumber" component="div" className="text-sm text-red-600" />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      disabled={isSubmitting}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  {/* Step 3: Address Information */}
                  <h3 className="text-lg font-semibold">Address</h3>

                  <div>
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                      Province
                    </label>
                    <Field
                      name="province"
                      type="text"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage name="province" component="div" className="text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <Field
                      name="state"
                      type="text"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage name="state" component="div" className="text-sm text-red-600" />
                  </div>

                  <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                      District
                    </label>
                    <Field
                      name="district"
                      type="text"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage name="district" component="div" className="text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                      Postal Code
                    </label>
                    <Field
                      name="postal_code"
                      type="text"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage name="postal_code" component="div" className="text-sm text-red-600" />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      disabled={isSubmitting}
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}

              {error && <div className="text-sm text-red-600">{error}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;

