import { useState } from 'react';
import coins from '../assets/images/coins.webp';
import { useSelector } from 'react-redux';
import { useGetRefferalUsersQuery } from '../redux/userApi';
import { toast } from 'react-toastify';

function Team() {
  const { profile } = useSelector((state) => state.user);
  const {
    data: referredUsers,
    error,
    isLoading,
  } = useGetRefferalUsersQuery(profile?.referralLink, {
    skip: !profile?.referralLink,
  });

  const referredUserList = referredUsers?.referredUsers || [];
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profile?.referralLink || '');
    toast.success('Referral link copied to clipboard!');
  };

  const handleDetailClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div style={{ background: `url(${coins})`, backgroundSize: "cover" }}>
      <div className="w-full min-h-screen bg-[#262a31bf] p-2">
        <p className='text-2xl sm:text-5xl font-bold text-center text-white mb-[1rem] mt-3'>
          <span className='text-[#b39c2a]'>BMX</span>Adventure
        </p>

        <section>
          <div className='container mx-auto px-4 flex flex-col items-center justify-center gap-4 mb-40'>
            <h2 className='text-3xl font-bold uppercase text-[#b39c2a]'>BMX</h2>
            <h2 className='text-md sm:text-xl font-medium uppercase text-white'>
              Total Members: {profile?.referredPoints?.length || 0}
            </h2>
            <h2 className='text-md text-center sm:text-start sm:text-xl font-medium uppercase text-white'>
              Copy the Referral Link to get Referral Coins{' '}
            </h2>

            {/* Referral Link Section */}
            <div className='flex items-center w-full gap-3 lg:w-3/6 lg:mx-auto'>
              <input
                type='text'
                readOnly
                value={profile?.referralLink || 'No referral link available'}
                className='flex-grow bg-gray-100 border-2 border-[#b39c2a] rounded-lg px-4 py-3 text-gray-700 outline-none'
              />
              <button onClick={handleCopyLink}
              >
                <a className="relative inline-flex items-center justify-start px-3 sm:px-6 text-nowrap sm:py-3 py-2 border border-black overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                  <span className="w-48 h-48 rounded rotate-[-40deg]  bg-[#b39c2a] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Copy Link</span>
                </a>
              </button>
            </div>

            {/* User Table */}
            <div className='w-full lg:w-3/6 lg:mx-auto relative shadow-md sm:rounded-lg'>
              {isLoading ? (
                <div className='flex justify-center items-center h-32'>
                  <p className='text-blue-900 font-bold'>Loading...</p>
                </div>
              ) : (
                <table className='w-full text-white text-center'>
                  <thead className='text-white uppercase'>
                    <tr className='border-b '>
                      <th className='py-3 px-3 bg-[#b39c2a] '>
                        Name
                      </th>
                      <th className='py-3 px-3 bg-[#b39c2a] '>
                        Level
                      </th>
                      <th className='py-3 px-3 bg-[#b39c2a] '>
                        Detail
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {referredUserList.map((user, index) => (
                      <tr
                        key={index}
                        className='border-b border-blue-800 text-black bg-white'
                      >
                        <td className='py-3 px-3'>{user?.name || 'N/A'}</td>
                        <td className='py-3 px-3'>{user?.UserLevel || 'N/A'}</td>
                        <td className='py-3 px-3'>
                          <button
                            onClick={() => handleDetailClick(user)}
                            className='text-blue-500 underline'
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white rounded-lg p-6 w-96'>
              <h2 className='text-xl font-bold mb-4'>User Details</h2>
              <div className='space-y-3'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Name
                  </label>
                  <input
                    type='text'
                    value={selectedUser?.name || ''}
                    className='w-full border rounded-md p-2'
                    readOnly
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <input
                    type='text'
                    value={selectedUser?.email || ''}
                    className='w-full border rounded-md p-2'
                    readOnly
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    User Level
                  </label>
                  <input
                    type='text'
                    value={selectedUser?.UserLevel || ''}
                    className='w-full border rounded-md p-2'
                    readOnly
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Referral Link
                  </label>
                  <input
                    type='text'
                    value={selectedUser?.referralLink || ''}
                    className='w-full border rounded-md p-2'
                    readOnly
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Total Points Earned
                  </label>
                  <input
                    type='text'
                    value={selectedUser?.totalPointsEarned || 0}
                    className='w-full border rounded-md p-2'
                    readOnly
                  />
                </div>
              </div>
              <div className='mt-4 flex justify-end'>
                <button
                  onClick={handleCloseModal}
                  className='bg-red-500 text-white px-4 py-2 rounded-md'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Team;
