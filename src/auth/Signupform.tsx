import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaX } from 'react-icons/fa6';

// Define the type for props
interface SignupFormProps {
  close: () => void;
  open: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ close, open }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <FaX
        onClick={close}
        tabIndex={0}
        role="button"
        aria-label="Close"
        onKeyDown={(e) => { if (e.key === 'Enter') close(); }}
        style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
      />
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
        <Formik
          initialValues={{
            fname: '',
            lname: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            province: '',
            state: '',
            district: '',
            postal_code: '',
          }}
          validationSchema={Yup.object({
            fname: Yup.string().required('First Name is required'),
            lname: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), ''], 'Passwords must match')
              .required('Confirm Password is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            province: Yup.string(),
            state: Yup.string(),
            district: Yup.string(),
            postal_code: Yup.string(),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null); // Reset the error state before submitting
            try {
              const response = await axios.post('/api/auth/signup', values);
              console.log(response.data);
              close(); // Close the form
              open();  // Open the success or login form
            } catch (error) {
              console.error(error);
              setError('Sign up failed. Please try again.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                    Province
                  </label>
                  <Field
                    name="province"
                    type="text"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
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
                </div>
              </div>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
