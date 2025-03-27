import  { useState } from 'react';
import coins from '../assets/images/coins.webp';
import { FaUser, FaCommentDots } from 'react-icons/fa';
import { useSendFeedbackMutation } from '../redux/userApi';
import { toast } from 'react-toastify';

const FeedBack = () => {
  const [sendFeedback, { isLoading }] = useSendFeedbackMutation();
  const [formData, setFormData] = useState({
    name: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('form, dara', formData.content);
    try {
      const res = await sendFeedback({ content: formData.content }).unwrap();
      console.log(res);
      toast.success(res?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div style={{ background: `url(${coins})`, backgroundSize: "cover" }}>
       <div className="w-full min-h-screen bg-[#262a31bf] p-2">
      <section>
        <p className='text-2xl sm:text-5xl font-bold text-center text-white mb-[1rem] mt-3'>
          <span className='text-[#b39c2a]'>BMX</span>Adventure
        </p>
        <div className='container mx-auto px-4 mb-20 sm:mb-30 setting-style'>
          <h3 className='uppercase text-center text-xl sm:text-2xl mt-2 mb-3 sm:mt-4 text-[#b39c2a] font-bold'>
            Feedback
          </h3>
          <p className='text-center text-white mb-6'>
            Add your feedback to this website. We value your opinions and
            suggestions.
          </p>
          <form onSubmit={handleSubmit} className='lg:w-1/2 lg:mx-auto bg-white p-8 rounded-md'>
            <div className='mb-4'>
              <label
                htmlFor='name'
                className=' font-medium text-[#b39c2a] mb-2 text-sm flex items-center'
              >
                <FaUser className='mr-2 text-[#b39c2a]' /> Your Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                className='shadow-sm bg-gray-50 border border-[#b39c2a] text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='content'
                className=' font-medium text-[#b39c2a] mb-2 text-sm flex items-center'
              >
                <FaCommentDots className='mr-2 text-[#b39c2a]' /> Your content
              </label>
              <textarea
                name='content'
                id='content'
                rows='4'
                className='shadow-sm bg-gray-50 border border-[#b39c2a] text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5'
                value={formData.content}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type='submit'
             
            >
              <a className="relative inline-flex items-center justify-start px-6 text-nowrap py-2 border border-black overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                <span className="w-48 h-48 rounded rotate-[-40deg]  bg-[#b39c2a] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">{isLoading ? 'Submitting...' : 'Submit'}</span>
                </a>
              
            </button>
          </form>
        </div>
      </section>
      </div>
    </div>
  );
};

export default FeedBack;
