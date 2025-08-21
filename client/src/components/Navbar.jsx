import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
const Navbar = () => {
  const user = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate()
  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center  ">
        <img onClick={()=>navigate('/')} src={assets.logo} className="cursor-pointer" alt="logo" />
        {/* check if is an exist user  */}
        {user.isSignedIn ? (
          <div className="flex items-center gap-3">
            <Link to={"/applications"} className="border-b border-gray-300">Applied Jobs</Link>
            <p className="hidden md:block">Hi , {user.user.firstName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer">
              Recruiter
            </button>
            <button
              onClick={openSignIn}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full "
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
