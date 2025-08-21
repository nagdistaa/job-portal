import { useEffect, useState } from "react";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import useAppContext from "../context/AppContext";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useAppContext();
  const [showFilter, setShowFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  // !handlers
  // !handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c != category)
        : [...prev, category]
    );
  };
  // !handle selected location
  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc != location)
        : [...prev, location]
    );
  };
  // !use effect || filter the data
  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [ selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 ">
      {/* sidebar filter */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* search filter from 'hero component */}
        {isSearched &&
          (searchFilter.title != "" || searchFilter.location != "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 to-gray-600 flex gap-3">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({
                          ...prev,
                          title: "",
                        }))
                      }
                      src={assets.cross_icon}
                      alt="cross"
                      className="cursor-pointer"
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({
                          ...prev,
                          location: "",
                        }))
                      }
                      src={assets.cross_icon}
                      alt="cross"
                      className="cursor-pointer"
                    />
                  </span>
                )}
              </div>
            </>
          )}
        {/* show filter ? */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="px-5 py-2 rounded border border-gray-400 lg:hidden "
        >
          {showFilter ? "close" : "Filters"}
        </button>
        {/* category filter */}
        <div className={`${!showFilter && "max-lg:hidden"}`}>
          <h4
            className="font-medium text-lg
           py-4"
          >
            Search By Categories
          </h4>
          <ul className="text-gray-600 space-y-4">
            {JobCategories.map((category, idx) => {
              return (
                <li key={idx} className="flex gap-3 items-center">
                  <input
                    className="scale-125"
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                  />
                  {category}
                </li>
              );
            })}
          </ul>
        </div>
        {/* location filter */}
        <div className="className={`${!showFilter && 'max-lg:hidden' }`}">
          <h4
            className="font-medium text-lg
           py-4"
          >
            Search By Country
          </h4>
          <ul className="text-gray-600 space-y-4">
            {JobLocations.map((loc, idx) => {
              return (
                <li key={idx} className="flex gap-3 items-center">
                  <input
                    className="scale-125"
                    type="checkbox"
                    onChange={() => handleLocationChange(loc)}
                    checked={selectedLocations.includes(loc)}
                  />
                  {loc}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* jobs cards */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h2 className="font-medium text-3xl py-2" id="job-list">
          Latest Job
        </h2>
        <p className="mb-8">Get your desired job from top companies</p>
        {/* main */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, idx) => (
              <JobCard key={idx} job={job} />
            ))}
        </div>
        {/* pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <img
                src={assets.left_arrow_icon}
                alt=""
                onClick={() => setCurrentPage((prev) => prev - 1)}
              />
            </a>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, idx) => (
                <a href="#job-list">
                  <button
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                      currentPage === idx + 1
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {idx + 1}
                  </button>
                </a>
              )
            )}
            <a href="#job-list">
              <img
                src={assets.right_arrow_icon}
                alt=""
                onClick={() => setCurrentPage((prev) => prev + 1)}
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
