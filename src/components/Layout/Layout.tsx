import Footer from "./Footer";
import Header from "./Header";

interface ILayout {
  children: JSX.Element;
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 h-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
