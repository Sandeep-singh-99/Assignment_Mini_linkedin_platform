import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SignUp } from '../redux/slice/authSlice';
import { toast } from 'react-toastify';

export default function SignUpPage() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
  });

  // State for form errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    let newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.bio) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.length > 200) {
      newErrors.bio = 'Bio cannot exceed 200 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await dispatch(SignUp(formData));
      if (result.error) {
        throw new Error(result.payload.message || 'Sign up failed');
      }
      setFormData({
        name: '',
        email: '',
        password: '',
        bio: '',
      });
      toast.success(result.payload.message || 'Sign up successful');
      navigate('/');
    } catch (error) {
      console.error('Error during sign up:', error);
      toast.error(error.message || 'Sign up failed');
      setErrors({ name: 'Sign up failed', email: '', password: '', bio: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder-gray-400"
              placeholder="Enter your name"
              aria-describedby="name-error"
            />
            {errors.name && (
              <p id="name-error" className="mt-2 text-sm text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder-gray-400"
              placeholder="Enter your email"
              aria-describedby="email-error"
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder-gray-400 resize-none"
              placeholder="Tell us about yourself"
              aria-describedby="bio-error bio-counter"
            />
            <p
              id="bio-counter"
              className={`mt-2 text-sm ${
                formData.bio.length > 200 ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              {formData.bio.length}/200 characters
            </p>
            {errors.bio && (
              <p id="bio-error" className="mt-2 text-sm text-red-500">
                {errors.bio}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder-gray-400"
              placeholder="Enter your password"
              aria-describedby="password-error"
            />
            {errors.password && (
              <p id="password-error" className="mt-2 text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700 transition duration-200"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}