import { Toaster } from "../ui/toaster";
import Footer from "./Footer";
import Header from "./Header";

interface ILayout {
  children: JSX.Element;
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#261150] flex flex-col">
      <Toaster />
      <Header />
      <main className="flex justify-center flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
