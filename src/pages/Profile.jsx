import { useSelector } from 'react-redux';
import coins from '../assets/images/coins.webp';

function Profile() {
  const { profile } = useSelector((state) => state?.user);
  console.log('profile', profile);

  return (
    <div className="min-h-screen bg-gray-100" style={{ background: `url(${coins})`, backgroundSize: "cover" }}>
      <div className='w-full bg-[#262a31bf] p-2'>
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-2xl sm:text-5xl font-bold text-white">
            <span className="text-[#b39c2a]">BMX</span>Adventure
          </h1>
          <p className="text-xl font-semibold text-[#b39c2a]">Your Profile</p>
        </header>

        {/* Profile Details */}
        <div className="container mx-auto px-4 mb-28">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            {/* Personal Information Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#b39c2a] mb-6">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-bold text-[#b39c2a]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={profile?.name || ''}
                    readOnly
                    className="w-full p-3 border border-[#b39c2a] rounded-lg focus:outline-none outline-[#b39c2a] "
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-bold text-[#b39c2a]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={profile?.email || ''}
                    readOnly
                    className="w-full p-3 border border-[#b39c2a] rounded-lg focus:outline-none outline-[#b39c2a] "
                  />
                </div>
              </div>
            </section>

            {/* Account Details Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#b39c2a] mb-6">
                Account Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-bold text-[#b39c2a]">
                    User Level
                  </label>
                  <input
                    type="text"
                    value={`Level ${profile?.UserLevel || 1}`}
                    readOnly
                    className="w-full p-3 border border-[#b39c2a] rounded-lg focus:outline-none outline-[#b39c2a] "
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-[#b39c2a]">
                    Total Points Earned
                  </label>
                  <input
                    type="text"
                    value={profile?.totalPointsEarned || 0}
                    readOnly
                    className="w-full p-3 border border-[#b39c2a] rounded-lg focus:outline-none outline-[#b39c2a] "
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-[#b39c2a]">
                    Converted Points (PKR)
                  </label>
                  <input
                    type="text"
                    value={`PKR ${profile?.convertedPointsInPKR || 0}`}
                    readOnly
                    className="w-full p-3 border border-[#b39c2a] rounded-lg focus:outline-none outline-[#b39c2a] "
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-[#b39c2a]">
                    Referral Link
                  </label>
                  <input
                    type="text"
                    value={profile?.referralLink || ''}
                    readOnly
                    className="w-full p-3 border border-[#b39c2a] rounded-lg focus:outline-none outline-[#b39c2a] "
                  />
                </div>
              </div>
            </section>

            {/* Card Details Section */}
            <section>
              <h2 className="text-2xl font-bold text-[#b39c2a] mb-6">
                Card Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-bold text-[#b39c2a]">
                    Card Number 1
                  </label>
                  <input
                    type="text"
                    value={profile?.cardDetails?.cardNumber1 || ''}
                    readOnly
                    className="w-full p-3 border border-[#b39c2a] rounded-lg focus:outline-none outline-[#b39c2a] "
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-[#b39c2a]">
                    Card Number 2
                  </label>
                  <input
                    type="text"
                    value={profile?.cardDetails?.cardNumber2 || ''}
                    readOnly
                    className="w-full p-3 border border-[#b39c2a] rounded-lg focus:outline-none outline-[#b39c2a] "
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-[#b39c2a]">
                    Card Number 3
                  </label>
                  <input
                    type="text"
                    value={profile?.cardDetails?.cardNumber3 || ''}
                    readOnly
                    className="w-full p-3 border border-[#b39c2a] rounded-lg focus:outline-none outline-[#b39c2a] "
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;