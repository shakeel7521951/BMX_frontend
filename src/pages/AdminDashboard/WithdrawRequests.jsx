import { toast } from "react-toastify";
import { useGetAllRequestsQuery, useUpdateWithdrawStatusMutation } from "../../redux/withdrawApi";

const WithdrawRequestsTable = () => {
  // Fetch withdrawal requests from API
  const { data, isLoading, isError, error ,refetch} = useGetAllRequestsQuery();
  const [updateWithdrawStatus] = useUpdateWithdrawStatusMutation();
  const requests = data?.data;

  if (isLoading)
    return <p className="text-center text-blue-500">Loading requests...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500">
        Error: {error?.data?.message || "Failed to load requests."}
      </p>
    );

  // Handle Status Update
  const handleStatusChange = async (withdrawId, newStatus) => {
    console.log(withdrawId,newStatus);
    try {
      await updateWithdrawStatus({ withdrawId, status: newStatus }).unwrap();
      toast.success(`Withdrawal request updated to ${newStatus}.`);
      refetch();
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center">
        Withdrawal <span className="text-[#B39C2A]">Requests</span> 
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#B39C2A] text-white">
              <th className="border border-gray-300 px-4 py-2">User Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Amount (PKR)</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr
                  key={request._id}
                  className="text-center border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {request.userId?.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {request.userId?.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {request.amount}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-semibold ${
                      request.status === "Pending"
                        ? "text-yellow-500"
                        : request.status === "Approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {request.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {/* Dropdown for Status Update */}
                    <select
                      onChange={(e) => handleStatusChange(request._id, e.target.value)}
                      value={request.status}
                      className="border px-3 py-1 rounded bg-white focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No withdrawal requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawRequestsTable;
