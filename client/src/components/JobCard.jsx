import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="border p-6 border-gray-300 shadow rounded  cursor-pointer">
      <div className="flex justify-between items-center">
        <img src={assets.company_icon} alt="" className="h-8" />
      </div>
      <h4 className="font-medium text-xl mt-2">{job.title}</h4>
      <div className="flex items-center gap-3 mt-2 text-xs">
        <span className="bg-blue-50 border border-blue-200 px-4 py-2 rounded">
          {job.location}
        </span>
        <span className="bg-red-50 border border-red-200 px-4 py-2 rounded">
          {job.level}
        </span>
      </div>
      <p
        className="text-gray-500 text-sm mt-4"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>
      <div className="flex items-center gap-4 text-sm mt-4">
        <button
          onClick={() => navigate(`/apply-job/${job._id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Apply Now
        </button>
        <button
          onClick={() => navigate(`/apply-job`)}
          className="text-gray-600 border border-gray-500 px-4 py-2 rounded hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
