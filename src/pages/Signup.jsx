import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Link as LinkIcon, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../redux/userApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/userSlice';

const Signup = () => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupFunc, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const { email, password,phone, confirmPassword, referralCode } = data;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{8,}$/;

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const { confirmPassword: _, ...personData } = data;

    // Exclude referralCode if it's empty
    if (!referralCode) {
      delete personData.referralCode;
    }

    try {
      const res = await signupFunc(personData).unwrap();
      toast.success(res?.message);
      navigate('/verify-user',{state:{user:personData}});
    } catch (error) {
      toast.error(error?.data?.message);
    }
    setError('');
  };

  return (
    <div className='container mx-auto px-4 flex items-center my-2'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-lg mx-auto p-6 rounded-lg shadow-lg'
      >
        <p className='text-2xl sm:text-5xl font-bold text-center text-blue-950 mb-[40px] '>
          <span className='text-[#b39a2c]'>BMX</span>Adventure
        </p>

        {/* Name Field */}
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-[#b39a2c]'
          >
            Name
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <User className='text-[#b39a2c] w-5 h-5' />
            </div>
            <input
              type='text'
              name='name'
              placeholder='Your Name'
              className='block w-full p-2.5 pl-10 text-sm text-gray-900 bg-gray-50 border-2 rounded-lg outline-none border-[#b39a2c]'
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-[#b39a2c]'
          >
            Email
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <Mail className='text-[#b39a2c] w-5 h-5' />
            </div>
            <input
              type='email'
              name='email'
              placeholder='youremail@gmail.com'
              className='block w-full p-2.5 pl-10 text-sm text-gray-900 bg-gray-50 border-2 rounded-lg outline-none border-[#b39a2c]'
              required
            />
          </div>
        </div>
        {/* Phone Field */}
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-[#b39a2c]'
          >
            Phone
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <Phone className='text-[#b39a2c] w-5 h-5' />
            </div>
            <input
              type='Number'
              name='phone'
              placeholder='Enter your jazzcash number'
              className='block w-full p-2.5 pl-10 text-sm text-gray-900 bg-gray-50 border-2 rounded-lg outline-none border-[#b39a2c]'
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-[#b39a2c]'
          >
            Password
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <Lock className='text-[#b39a2c] w-5 h-5' />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='********'
              className='block w-full p-2.5 pl-10 text-sm text-gray-900 bg-gray-50 border-2 rounded-lg outline-none border-[#b39a2c] '
              required
            />
            <div
              className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className='text-[#b39a2c] w-5 h-5' />
              ) : (
                <Eye className='text-[#b39a2c] w-5 h-5' />
              )}
            </div>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className='mb-4'>
          <label
            htmlFor='confirmPassword'
            className='block mb-2 text-sm font-medium text-[#b39a2c]'
          >
            Confirm Password
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <Lock className='text-[#b39a2c] w-5 h-5' />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='********'
              className='block w-full p-2.5 pl-10 text-sm text-gray-900 bg-gray-50 border-2 rounded-lg outline-none border-[#b39a2c] '
              required
            />
            <div
              className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className='text-[#b39a2c] w-5 h-5' />
              ) : (
                <Eye className='text-[#b39a2c] w-5 h-5' />
              )}
            </div>
          </div>
        </div>

        {/* Referral Link Field */}
        <div className='mb-4'>
          <label
            htmlFor='referralCode'
            className='block mb-2 text-sm font-medium text-[#b39a2c]'
          >
            Referral Link (Optional)
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <LinkIcon className='text-[#b39a2c] w-5 h-5' />
            </div>
            <input
              type='text'
              name='referralCode'
              placeholder='Referral Link (if any)'
              className='block w-full p-2.5 pl-10 text-sm text-gray-900 bg-gray-50 border-2 rounded-lg outline-none border-[#b39a2c]'
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className='text-[#b39a2c] text-xs mb-4'>{error}</p>}

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-[#b39a2c] text-white font-medium py-2.5 px-4 rounded-lg focus:ring-4 '
        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
        <div className='text-center mt-4'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <Link
              to={'/login'}
              className='text-[#b39a2c] font-medium hover:underline'
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
