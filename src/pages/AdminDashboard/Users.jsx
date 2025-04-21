import { useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [deleteUser] = useDeleteUserMutation(); 

  const users = data?.users && Array.isArray(data.users) ? data.users : [];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateClick = (user, status) => {
    setSelectedUser(user);
    setNewStatus(status);
  };

  const confirmUpdate = async () => {
    try {
      await updateStatus({
        userId: selectedUser._id,
        status: newStatus,
      }).unwrap();
      refetch();
      toast.success("User status updated successfully!");
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleRoleUpdate = async (user, role) => {
    try {
      await updateUserRole({ userId: user._id, role }).unwrap();
      refetch();
      toast.success(`Role updated to ${role} successfully!`);
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    try {
      // Uncomment and implement your delete API logic here:
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully!");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  if (isLoading) return <p>Loading users...</p>;
  if (!users.length) return <p>No users found.</p>;

  return (
    <div className="md:p-6 mb-16 md:mb-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4 mx-auto text-center">
        User <span className="text-[#B39C2A]">Records</span>
      </h2>

      {/* User Count */}
      <div className="mb-4 text-right">
        <span className="text-sm md:text-base font-medium bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md">
          Total Users: {users.length}
        </span>
      </div>

      {/* Search Field */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full md:w-1/3 p-2 border rounded shadow-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-[#B39C2A] text-white">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Level</th>
              <th className="p-2 border">Total Points</th>
              <th className="p-2 border">Converted PKR</th>
              <th className="p-2 border">User Role</th>
              <th className="p-2 border">Eligible</th>
              <th className="p-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className="text-center">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">
                  <img
                    src={user.paymentImage}
                    alt={user.name}
                    className="w-12 h-12 rounded-full mx-auto cursor-pointer"
                    onClick={() => setSelectedImage(user.paymentImage)}
                  />
                </td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.phone}</td>
                <td className="p-2 border">{user.status}</td>
                <td className="p-2 border">{user?.UserLevel ?? "N/A"}</td>
                <td className="p-2 border">
                  {user?.dailyPoints?.totalPoints ?? 0}
                </td>
                <td className="p-2 border">
                  {user?.convertedPointsInPKR ?? 0}
                </td>
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
                <td className="p-2 border">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete User"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirm Status Update Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-[400px]">
            <p className="text-lg">
              Are you sure you want to update {selectedUser.name}'s status to{" "}
              <strong>{newStatus}</strong>?
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

      {/* Full Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center">
          <img
            src={selectedImage}
            alt="Full Preview"
            className="w-full h-full object-contain"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-70"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUserTable;
