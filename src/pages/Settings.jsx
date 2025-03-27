import React, { useState } from 'react';
import coins from '../assets/images/coins.webp';
import { toast } from 'react-toastify';
import { FaLock, FaUnlock, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUpdatePasswordMutation } from '../redux/userApi';
import { useNavigate } from 'react-router';

function Settings() {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: '',
    Password: '',
    ConfirmPassword: '',
  });

  const [showoldPassword, setShowoldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { Password, ConfirmPassword } = formData;

    // Validate password length
    if (Password.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }

    // Check if new password matches confirm password
    if (Password !== ConfirmPassword) {
      toast.error('New password and confirm password do not match!');
      return;
    }

    try {
      const res = await updatePassword(formData).unwrap();
      toast.success(res?.message);
      navigate('/');
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div style={{ background: `url(${coins})`, backgroundSize: "cover" }}>
       <div className="w-full min-h-screen bg-[#262a31bf] p-2">
      <section>
        <p className=' text-2xl sm:text-5xl font-bold text-center text-white mb-[1rem] mt-3'>
          <span className='text-[#b39c2a]'>BMX</span>Adventure
        </p>
        <div className='container mx-auto px-4 mb-20 sm:mb-40 setting-style'>
          <h3 className='uppercase text-center text-white text-md sm:text-2xl mt-3 mb-3 sm:mt-10 font-bold'>
            Change Password
          </h3>
          <form onSubmit={handleSubmit} className='lg:w-1/2 lg:mx-auto'>
            <div className='mb-4'>
              <label
                htmlFor='oldPassword'
                className=' font-medium text-white mb-2 text-sm flex items-center'
              >
                <FaLock className='mr-2 text-[#b39c2a]' /> Current Password
              </label>
              <div className='relative'>
                <input
                  type={showoldPassword ? 'text' : 'password'}
                  name='oldPassword'
                  id='oldPassword'
                  className='shadow-sm bg-gray-50 border border-[#b39c2a] outline-none text-gray-900 text-sm rounded-lg fo block w-full p-2.5'
                  value={formData.oldPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type='button'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                  onClick={() => setShowoldPassword(!showoldPassword)}
                >
                  {showoldPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className='mb-4'>
              <label
                htmlFor='Password'
                className=' font-medium text-white mb-2 text-sm flex items-center'
              >
                <FaUnlock className='mr-2 text-[#b39c2a]' /> New Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='Password'
                  id='Password'
                  className='shadow-sm bg-gray-50 border border-[#b39c2a] outline-none text-gray-900 text-sm rounded-lg fo block w-full p-2.5'
                  value={formData.Password}
                  onChange={handleChange}
                  required
                />
                <button
                  type='button'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className='mb-4'>
              <label
                htmlFor='ConfirmPassword'
                className=' font-medium text-white mb-2 text-sm flex items-center'
              >
                <FaKey className='mr-2 text-[#b39c2a]' /> Confirm Password
              </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='ConfirmPassword'
                  id='ConfirmPassword'
                  className='shadow-sm bg-gray-50 border border-[#b39c2a] outline-none text-gray-900 text-sm rounded-lg  block w-full p-2.5'
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type='button'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type='submit'
             
            >
              <a className="relative inline-flex items-center justify-start px-10 text-nowrap py-3 border border-black overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                <span className="w-48 h-48 rounded rotate-[-40deg]  bg-[#b39c2a] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">{isLoading ? 'Loading...' : 'SAVE'}</span>
                </a>
              
            </button>
          </form>
        </div>
      </section>
      </div>
    </div>
  );
}

export default Settings;
