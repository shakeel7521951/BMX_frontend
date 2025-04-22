import { FaHome, FaUser, FaTachometerAlt } from 'react-icons/fa';
import { MdMarkEmailRead } from 'react-icons/md';
import { FaArrowCircleRight } from 'react-icons/fa';
import { useLogoutMutation } from '../redux/userApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearProfile } from '../redux/userSlice';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function BottomBar() {
  const [logoutFunc] = useLogoutMutation();
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutFunc().unwrap();
      toast?.success(res?.message);
      dispatch(clearProfile());
      navigate('/login');
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#fff] border-t border-gray-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-around py-">
            {/* Home */}
            <Link to={'/'} className="flex flex-col items-center py-2">
              <FaHome className="text-3xl sm:text-4xl text-[#b39c2a]" />
              <span className="text-xs sm:text-sm font-semibold text-black">Home</span>
            </Link>

            {/* Feedback */}
            <Link to={'/feedback'} className="flex flex-col items-center group py-2">
              <MdMarkEmailRead className="text-3xl sm:text-4xl text-[#b39c2a]" />
              <span className="text-xs sm:text-sm font-semibold md:text-base text-[#09090a]">Feedback</span>
            </Link>

            {/* Dashboard - Only for Admins */}
            {(profile?.userRole === "Admin" || profile?.userRole === "admin") && (
              <Link to="/admin/users" className="flex flex-col items-center py-2">
                <FaTachometerAlt className="text-3xl sm:text-4xl text-[#b39c2a]" />
                <span className="text-xs sm:text-sm font-semibold text-black">Dashboard</span>
              </Link>
            )}

            {/* Logout / Login */}
            {profile ? (
              <button className="flex flex-col items-center py-2" onClick={handleLogout}>
                <FaArrowCircleRight className="text-3xl sm:text-4xl transition-all duration-200 ease-in text-[#b39c2a]" />
                <span className="text-xs sm:text-sm md:text-base text-black">Logout</span>
              </button>
            ) : (
              <Link to={'/login'} className="flex flex-col items-center py-2">
                <FaUser className="text-3xl sm:text-4xl text-[#b39c2a] transition-all duration-200 ease-in hover:text-[#b39c2a]" />
                <span className="text-xs sm:text-sm md:text-base font-semibold text-black">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomBar;
