import { useRef } from "react";
import { assets } from "../assets/assets";
import useAppContext from "../context/AppContext";
import Companies from "./Companies";

const Hero = () => {
  const { setIsSearched, setSearchFilter  } = useAppContext();
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const handleOnSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
    
  };
  return (
    <div className="container 2xl:px-20 mx-auto my-10 text-center ">
      {/* content */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 mx-2 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10,000+ jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        {/* inputs */}
        <div className="flex  items-center justify-between bg-white rounded text-gray-600 max-w-lg pl-4 mx-4 sm:mx-auto">
          {/* search */}
          <div className="flex items-center gap-4 border-r border-gray-300 mr-5">
            <img src={assets.search_icon} alt="" className="h-4 sm:h-5" />
            <input
              ref={titleRef}
              type="text"
              placeholder="Search for jobs"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
            />
          </div>
          {/* location */}
          <div className="flex items-center gap-4">
            <img src={assets.location_icon} alt="" className="h-4 sm:h-5" />
            <input
              ref={locationRef}
              type="text"
              placeholder="Location"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
            />
          </div>
          {/* button */}
          <button
            onClick={handleOnSearch}
            className="bg-blue-600 px-6 py-2 rounded text-white m-1 cursor-pointer "
          >
            Search
          </button>
        </div>
      </div>
      <Companies />
    </div>
  );
};

export default Hero;
