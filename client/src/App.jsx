import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import Home from "./pages/Home";

const App = () => {
  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apply-job/:jobId" element={<ApplyJob />} />
      <Route path="/applications" element={<Applications />} />
    </Routes>
  );
  return (
    <div>
      <Navbar />
      {routes}
      <Footer />
    </div>
  );
};

export default App;
