import { assets } from "../assets/assets";

const Companies = () => {
  return (
    <div className="border border-gray-300 shadow-md mx-2 mt-6 p-6 rounded-md flex">
      <div className="flex justify-center gap-10 lg:gap-16 flex-wrap">
        <p className="font-medium">Trusted By</p>
        <img src={assets.microsoft_logo} alt="" className="h-6" />
        <img src={assets.walmart_logo} alt="" className="h-6" />
        <img src={assets.adobe_logo} alt="" className="h-6" />
        <img src={assets.samsung_logo} alt="" className="h-6" />
        <img src={assets.accenture_logo} alt="" className="h-6" />
        <img src={assets.accenture_logo} alt="" className="h-6" />
      </div>
    </div>
  );
};

export default Companies;
