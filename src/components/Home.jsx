import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaTasks, FaUser, FaWallet, FaUsers, FaCog, FaInfoCircle } from 'react-icons/fa';
import coins from '../assets/images/coins.webp';

const menuItems = [
  { to: '/dailywork', icon: <FaTasks size={60} />, title: 'Daily Work' },
  { to: '/profile', icon: <FaUser size={60} />, title: 'My Profile' },
  { to: '/wallet', icon: <FaWallet size={60} />, title: 'Wallet' },
  { to: '/team', icon: <FaUsers size={60} />, title: 'My Team' },
  { to: '/settings', icon: <FaCog size={60} />, title: 'Settings' },
  { to: '/about', icon: <FaInfoCircle size={60} />, title: 'About' },
];

const HomePage = () => {
  const { profile } = useSelector((state) => state.user);
  const cardDetails = profile?.cardDetails;

  return (
    <div className='flex max-w-full' style={{ background: `url(${coins})`, backgroundSize: "cover" }}>
      <div className='w-full bg-[#262a31bf] p-2'>
        <div className='mx-auto flex flex-col gap-4 items-center'>
          {/* Logo Header */}
          <p className='text-4xl sm:text-6xl font-bold text-center text-white mb-5 sm:mb-[40px] mt-5 md:mt-[30px]'>
            <span className='text-[#b39c2a]'>BMX</span>Adventure
          </p>

          {/* Card Container */}
          <div className='max-w-[350px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[520px] h-[200px] md:h-[250px] w-full mx-auto overflow-hidden rounded-2xl bg-[#191a2093]'
            style={{ background: 'linear-gradient(190deg, #795DF7 40%, #795DF7 25%, #b39c2a 50%)' }}>
            <div className='py-[10px] sm:py-[30px] px-[12px] flex flex-col justify-between items-center w-[100%] h-[100%] md:w-50%'>
              {/* Card Logo */}
              <p className='text-xl font-bold text-white self-end'>
                <span className='text-[#b39c2a]'>BMX</span>Adventure
              </p>

              {/* Numbers Section */}
              <div className='grid grid-cols-3 w-full text-center h-[130px] gap-10'>
                <div className='flex flex-col items-center'>
                  <div className='text-3xl font-medium text-white'>{cardDetails?.cardNumber1 || 'Null'}</div>
                  <div className='text-xs text-white/80 uppercase mt-6'>Card Holder</div>
                  <div className='text-lg font-medium text-white'>{profile?.name || 'Null'}</div>
                </div>
                <div className='flex justify-center'>
                  <div className='text-3xl font-medium text-white'>{cardDetails?.cardNumber2 || 'Null'}</div>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='text-3xl font-medium text-white'>{cardDetails?.cardNumber3 || 'Null'}</div>
                  <div className='text-xs text-white/80 uppercase mt-6'>User Level</div>
                  <div className='text-lg font-bold text-white'>{profile?.UserLevel || 'Null'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Join Text */}
          <div className='px-4 py-2 w-full max-w-[650px] text-md text-blue-950 font-medium bg-[#F0F0F0] rounded-xl'
            style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 3px' }}>
            <marquee direction="left" scrollDelay="10">
              Join 3 members in the same day and get rewards
            </marquee>
          </div>

          {/* Menu Grid */}
          <div className='grid  grid-cols-2 sm:grid-cols-2  md:grid-cols-3 gap-10 p-4 text-blue-500 font-bold sm:mb-[4rem] mb-[3rem]'>
            {menuItems.map((item, index) => (
              <MenuItem key={index} to={item.to} icon={item.icon} title={item.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, to, title }) => {
  return (
    <Link to={to} className='flex  flex-col items-center justify-center rounded-xl transition-transform active:scale-95 hover:scale-105 duration-300 ease-in-out'>
      <div className='mb-2 text-black flex justify-center items-center flex-col gap-10 bg-white h-[170px] sm:h-[220px] w-[170px] sm:w-[220px] rounded-xl p-4'>
        <span className=' text-xl md:text-2xl text-[#b39c2a]'>{icon}</span>
        <span className=' text-xl sm:text-2xl'>{title}</span>
      </div>
      
    </Link>
  );
};

export default HomePage;
