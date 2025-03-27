import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllUsersQuery,
  useUpdateEligibilityCriteriaMutation,
  useUpdateUserRoleMutation, 
} from "../../redux/userApi";

const AdminUserTable = () => {
  const { data, isLoading, refetch } = useGetAllUsersQuery();
  const [updateStatus] = useUpdateEligibilityCriteriaMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const users = data?.users && Array.isArray(data.users) ? data.users : [];

  const handleUpdateClick = (user, status) => {
    setSelectedUser(user);
    setNewStatus(status);
  };

  const confirmUpdate = async () => {
    try {
      await updateStatus({ userId: selectedUser._id, status: newStatus }).unwrap();
      refetch();
      toast.success("User status updated successfully!");
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // 🔹 Handle role updates
  const handleRoleUpdate = async (user, role) => {
    try {
      await updateUserRole({ userId: user._id, role }).unwrap();
      refetch();
      toast.success(`Role updated to ${role} successfully!`);
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  if (isLoading) return <p>Loading users...</p>;
  if (!users.length) return <p>No users found.</p>;

  return (
    <div className="md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 mx-auto text-center">User <span className="text-[#B39C2A]">Records</span></h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-[#B39C2A]">
              <th className="p-2 border text-white">Image</th>
              <th className="p-2 border text-white">Name</th>
              <th className="p-2 border text-white">Email</th>
              <th className="p-2 border text-white">Phone</th>
              <th className="p-2 border text-white">Status</th>
              <th className="p-2 border text-white">Level</th>
              <th className="p-2 border text-white">Total Points</th>
              <th className="p-2 border text-white">Converted PKR</th>
              <th className="p-2 border text-white">User Role</th>
              <th className="p-2 border text-white">Eligible</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="p-2 border">
                  <img
                    src={user.paymentImage}
                    alt={user.name}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.phone}</td>
                <td className="p-2 border">{user.status}</td>
                <td className="p-2 border">{user?.UserLevel ?? "N/A"}</td>
                <td className="p-2 border">{user?.dailyPoints?.totalPoints ?? 0}</td>
                <td className="p-2 border">{user?.convertedPointsInPKR ?? 0}</td>

                {/* 🔹 Role Selection */}
                <td className="p-2 border">
                  <select
                    className="border p-1"
                    value={user.userRole}
                    onChange={(e) => handleRoleUpdate(user, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* 🔹 Eligibility Selection */}
                <td className="p-2 border">
                  <select
                    className="border p-1"
                    value={user.eligible}
                    onChange={(e) => handleUpdateClick(user, e.target.value)}
                  >
                    <option value="unverified">Unverified</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-[400px]">
            <p className="text-lg">
              Are you sure you want to update {selectedUser.name}'s status to {newStatus}?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={confirmUpdate}
                disabled={isLoading}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {isLoading ? "Confirming..." : "Confirm"}
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                disabled={isLoading}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {isLoading ? "Cancelling..." : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserTable;
