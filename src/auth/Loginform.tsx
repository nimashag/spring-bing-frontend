import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaX } from 'react-icons/fa6';

interface LoginFormProps {
  close: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ close }) => {
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
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
              .min(8, 'Password must be at least 8 characters')
              .required('Password is required'),
          })}          
          onSubmit={async (values, { setSubmitting }) => {
            setError(null); // Reset the error state before submitting
            try {
              const response = await axios.post('http://localhost:3001/api/login', values);
              const { token, user } = response.data;
              console.log(user)
              localStorage.setItem('token', token);
              localStorage.setItem('profile', JSON.stringify(user));
              window.location.reload();
            } catch (error) {
              console.error(error);
              setError('Login failed. Please check your credentials and try again.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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
              {error && <div className="text-sm text-red-600">{error}</div>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
