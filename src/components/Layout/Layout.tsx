import Footer from "./Footer";
import Header from "./Header";

interface ILayout {
  children: JSX.Element;
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-500">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
