import { Toaster } from "../ui/toaster";
import Footer from "./Footer";
import Header from "./Header";

interface ILayout {
  children: JSX.Element;
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#300171cb] to-slate-900 flex flex-col">
      <Toaster />
      <Header />
      <main className="flex justify-center flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
