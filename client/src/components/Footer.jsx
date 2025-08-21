import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto flex  items-center justify-between gap-4  mt-20 border-t border-gray-300 py-5">
      <img width={160} src={assets.logo} />
      <p className="text-md text-gray-600 sm:hidden md:block">
        Copyright @nagdista | All Right Reserved
      </p>
      <div className="flex items-center justify-between gap-3">
        <img width={38} src={assets.facebook_icon} alt="" />
        <img width={38} src={assets.instagram_icon} alt="" />
        <img width={38} src={assets.twitter_icon} alt="" />
      </div>
    </div>
  );
};

export default Footer;
