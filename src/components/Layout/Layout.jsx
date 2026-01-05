import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { MetadataProvider } from "../../contexts/MetadataContext";

const Layout = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <MetadataProvider>
        <Navbar />
        <main className="flex-1 mb-8">
          <Outlet />
        </main>
      </MetadataProvider>

      <Footer />
    </div>
  );
};

export default Layout;
