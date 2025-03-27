import { useState } from "react";
import { useWithdrawRequestMutation } from "../redux/withdrawApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Ensure navigation after successful withdrawal

const WithdrawForm = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [withdrawRequest, { isLoading, isError, error: apiError }] = useWithdrawRequestMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const withdrawalAmount = Number(amount);

    if (isNaN(withdrawalAmount) || withdrawalAmount < 100) {
      setError("Minimum withdrawal amount is 100 PKR.");
      return;
    }

    try {
      const response = await withdrawRequest({ amount: withdrawalAmount }).unwrap();
      if (response.success) {
        toast.success(response.message);
        setAmount(""); 
        navigate("/wallet");
      } else {
        setError(response.message);
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Error:", err);

      // Extract error message properly
      const errorMessage = err?.data?.message || "An error occurred while processing the request.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Withdraw Request</h2>

      {/* Display Backend Error Messages */}
      {(error || isError) && (
        <p className="text-red-500 text-sm mb-3">
          {error || apiError?.data?.message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700 font-medium mb-1">Enter Amount (PKR)</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="100 or more"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button
          type="submit"
          className="mt-3 mx-auto w-fit bg-red-500 rounded"
          disabled={isLoading}
        >
          <span className="relative inline-flex items-center justify-start px-6 text-nowrap py-3 border border-black overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#b39c2a] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              {isLoading ? "Processing..." : "Request Withdraw"}
            </span>
          </span>
        </button>
      </form>
    </div>
  );
};

export default WithdrawForm;
