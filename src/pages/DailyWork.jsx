import { useEffect, useState } from "react";
import { useLazyGetPointsQuery, useUploadPaymentImageMutation } from "../redux/userApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/userSlice";
import { useGetAllTaskQuery } from "../redux/taskApi";
import { useNavigate } from "react-router";

const DailyWork = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { data } = useGetAllTaskQuery();
  const navigate = useNavigate();
  const [triggerGetPoints, { data: pointsData, isError, error }] = useLazyGetPointsQuery();

  const dailyworkarray = Array.isArray(data?.tasks) ? data.tasks : [];
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadPaymentImage, { isLoading }] = useUploadPaymentImageMutation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warn("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("paymentImage", selectedFile);

    setIsProcessing(true); // Start processing

    try {
      const response = await uploadPaymentImage(formData).unwrap();
      toast.success(response.message || "Image uploaded successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Image upload failed!");
      setIsProcessing(false); // Reset processing state if failed
    }
  };

  useEffect(() => {
    if (pointsData) {
      dispatch(setProfile(pointsData?.user));
      toast.success("Claimed reward successfully!");
    }
    if (isError) {
      toast.warn(error?.data?.message || "Something went wrong!");
    }
  }, [pointsData, isError, error, dispatch]);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col gap-4 items-center py-20">
      <h1 className="text-2xl sm:text-5xl font-bold text-center">
        Daily Work <span className=" text-[#b39c2a]">Tasks</span>
      </h1>
      {profile?.eligible === "verified" ? (
        <div className="flex flex-col gap-3 w-full">
          {dailyworkarray.map((task) => (
            <div
              key={task.id}
              className="p-4 border w-[350px] mx-auto border-black rounded-lg flex flex-col items-center"
            >
              <p className="text-red-600">{task.work}</p>
              <a
                href={task.link}
                onClick={(e) => {
                  e.preventDefault();
                  setTimeout(() => {
                    triggerGetPoints();
                  }, 1000);
                  window.open(task.link, "_blank");
                }}
                className="relative inline-flex items-center justify-start px-6 py-3 border border-black overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
              >
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#b39c2a] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                  Today-Task
                </span>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-lg shadow-lg mt-6 w-full max-w-lg">
          <h2 className="text-xl font-bold text-gray-800 text-center">
            Start Earning Rewards
          </h2>
          <p className="text-gray-600 text-center">
            A minimum investment of <span className="font-semibold text-red-600">1000</span> is required to activate your earnings.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg w-full text-center">
            <p className="text-gray-700 font-medium">Investment Details:</p>
            <h3 className="text-lg font-semibold text-gray-900">0329-8439828</h3>
            <h3 className="text-lg font-semibold text-[#b39c2a]">Jazzcash</h3>
            <p className="text-gray-700">
              Recipient: <span className="font-semibold">Ismail Ahmad</span>
            </p>
          </div>
          <p className="text-gray-600">Upload your payment proof for verification:</p>
          <input
            type="file"
            className="cursor-pointer border border-gray-300 rounded-lg p-2 w-full text-gray-700"
            onChange={handleFileChange}
          />
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className="relative inline-flex items-center justify-start px-8 text-nowrap py-3 border border-black overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
          >
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#b39c2a] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              {isLoading ? "Uploading..." : "Upload"}
            </span>
          </button>
          {(profile?.paymentImage) && (
            <p className="text-yellow-600 font-semibold text-center mt-4">
              Please wait while your request is being processed. Our team will verify your payment proof soon.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyWork;
