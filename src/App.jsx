import "./App.css";
import HomePage from "./components/Home";
import BottomBar from "./components/BottomBar";
import DailyWork from "./pages/DailyWork";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Team from "./pages/Team";
import Wallet from "./pages/Wallet";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import FeedBack from "./pages/FeedBack";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetProfileQuery } from "./redux/userApi";
import { useEffect } from "react";
import { setProfile } from "./redux/userSlice";
import VerifyUser from "./pages/VerifyUser";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminUserRecords from "./pages/AdminDashboard/Users";
import AdminRoute from "./AdminRoute";
import WithdrawForm from "./components/WithDrawForm";
import WithdrawRequestsTable from "./pages/AdminDashboard/WithdrawRequests";
import AdminNavbar from "./components/AdminNavbar";

const Layout = () => {
  return (
    <div>
      <Outlet /> 
      <BottomBar />
    </div>
  );
};

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dailywork", element: <DailyWork /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Profile /> },
      { path: "/settings", element: <Settings /> },
      { path: "/wallet", element: <Wallet /> },
      { path: "/team", element: <Team /> },
      { path: "/feedback", element: <FeedBack /> },
      { path: "/withdraw-form", element: <WithdrawForm /> },
    ],
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/verify-user", element: <VerifyUser /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        element: <AdminRoute />,
        children: [
          { path: "users", element: <AdminUserRecords /> }, 
          { path: "requests", element: <WithdrawRequestsTable /> }, 
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const { data: profile } = useGetProfileQuery();
  useEffect(() => {
    if (profile?.user) {
      dispatch(setProfile(profile?.user));
    }
  }, [profile, dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
